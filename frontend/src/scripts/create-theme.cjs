const fs = require('fs');
const path = require('path');

const BASE_DIR = path.resolve(__dirname, '../theme');
const jsonFilePath = `${BASE_DIR}/tokens/tokens.json`;
const themesDir = BASE_DIR;

const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
const tokenList = jsonData.$metadata.tokenSetOrder;

const formatKeyToLowerCase = (key) => {
    return key.toLowerCase();
};

const formatThemeDetailData = (file) => {
    const formattedFile = {};

    const replaceBracelet = (value) => {
        if (typeof value === 'string' && value.includes('{') && value.includes('}')) {
            return value.replace(/\{|\}/g, '');
        }
        return value;
    };

    const formatValue = (value) => {
        if (typeof value === 'object') {
            if ('value' in value && 'type' in value) {
                if (typeof value.value === 'string') return replaceBracelet(value.value);
                return formatThemeDetailData(value.value);
            }
            return formatThemeDetailData(value);
        }
        return replaceBracelet(value);
    };

    const convertNumberToRem = (value) => {
        if (!isNaN(Number(value))) {
            return `${value / 16}rem`;
        }
        return value;
    };

    Object.entries(file).forEach(([key, value]) => {
        const formattedValue = formatValue(value);
        formattedFile[key] = convertNumberToRem(formattedValue);
    });

    return formattedFile;
};

const formatThemeData = () => {
    const convertStringToVar = (contents) => {
        return contents.replace(/"([\w.-]+)"/g, (match, p1) => {
            if (p1.includes('.')) {
                const [firstPart, secondPart] = p1.split('.');
                return `${firstPart}["${secondPart}"]`;
            }
            return p1;
        });
    };
    const createContent = ({ fileName, theme }) => {
        const body = (name, value) => `export const ${name} = ${JSON.stringify(value, null, 2)};\n`;

        if (fileName === 'typo') {
            return Object.entries(theme).map(([key, value]) => {
                return body(key, value);
            }).join('');
        }

        if (fileName === 'font') {
            const fontKeys = Object.keys(jsonData.typo).join(', ');
            const header = `import { ${fontKeys} } from './typo';\n`
            return `${header}\n${convertStringToVar(body(fileName, theme))}`;
        }

        return body(fileName, theme);
    }

    tokenList.forEach((key) => {
        const value = jsonData[key];
        const fileName = formatKeyToLowerCase(key);
        const filePath = path.join(themesDir, `${fileName}.ts`);
        const theme = formatThemeDetailData(value);
        
        const fileContent = createContent({ fileName, theme });
        fs.writeFileSync(filePath, fileContent, 'utf-8');
    });
};

const createGlobalTheme = (tokens) => {
    const formatToImport = () => {
        return tokens.map((key)=>{
            const formattedKey = formatKeyToLowerCase(key);
            return `import { ${formattedKey} } from './${formattedKey}';`
        }).join('\n');
    };
    const formatToValue = () => {
        return tokens.map((key)=>{
            const formattedKey = formatKeyToLowerCase(key);
            return `${formattedKey}`;
        }).join(',\n  ');
    }

    const varsContent = `
    import { createGlobalTheme } from '@vanilla-extract/css';
    ${formatToImport()}

    export const vars = createGlobalTheme(':root', {
    ${formatToValue()}
    });
    `;

    fs.writeFileSync(`${themesDir}/index.css.ts`, varsContent, 'utf-8');
};

formatThemeData();
createGlobalTheme(tokenList.filter((key) => key !== 'typo' && key !== 'font'));