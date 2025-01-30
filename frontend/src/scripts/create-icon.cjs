const { existsSync, promises: fs } = require("fs");
const path = require("path");

const SVG_DIR = path.resolve(__dirname, "../components/Icon/svg");
const COMPONENT_DIR = path.resolve(__dirname,"../components/Icon/component");

const generateSvgComponentMap = async () => {
  const svgFiles = (await fs.readdir(SVG_DIR)).reduce(
    (map, svgFile) => {
      const componentName = path
        .basename(svgFile, ".svg")
        .replace(/(^\w|-\w)/g, (match) => match.replace("-", "").toUpperCase());
      map[componentName] = svgFile;
      return map;
    },
    {}
  );

  return svgFiles;
};

const deleteUnusedComponentFiles = async (svgComponentMap) => {
  if (!existsSync(COMPONENT_DIR)) {
    fs.mkdir(COMPONENT_DIR);
    return;
  }

  const componentFiles = await fs.readdir(COMPONENT_DIR);
  const componentFilesToDelete = componentFiles.filter((componentFile) => {
    const componentName = path.basename(componentFile, ".tsx");
    return !(componentName in svgComponentMap);
  });

  await Promise.all(
    componentFilesToDelete.map((file) => {
      const componentFilePath = path.resolve(COMPONENT_DIR, file);
      return fs.unlink(componentFilePath);
    })
  );
};

const createComponentContent = (
  componentName,
  svgContent,
  svgFile
) => {
  const iconName = path.basename(svgFile, ".svg");
  const hasStroke = svgContent.includes("stroke=");
  const fillAttributes = (svgContent.match(/fill="([^"]*)"/g) || []).filter(
    (attr) => attr !== 'fill="none"'
  );
  const hasFill = fillAttributes.length;
  const propsString = `{ className, width = 24${hasStroke || hasFill ? ` ${hasStroke ? ', stroke = "white"' : ""}${hasFill ? ', fill = "white"' : ""}` : ""}, ...rest }`;
  const modifiedSvgContent = svgContent
    .replace(/-(\w)/g, (_, letter) => letter.toUpperCase())
    .replace(/<svg([^>]*)width="(\d+)"/g, `<svg$1width={width}`)
    .replace(/<svg([^>]*)height="(\d+)"/g, `<svg$1height={width}`)
    .replace(/<svg([^>]*)fill="[^"]*"([^>]*)>/, "<svg$1$2>")
    .replace(/(<(?!rect)[^>]+)fill="([^"]+)"/g, `$1fill={fill}`)
    .replace(/(<(?!rect)[^>]+)stroke="([^"]+)"/g, `$1stroke={stroke}`)
    .replace(
      /<svg([^>]*)>/,
      `<svg$1 aria-label="${iconName} icon" fill="none" className={className} {...rest}>`
    )
    .replace(/style="maskType:luminance"/g, "mask-type='luminance'");

  return `   
import type { IconProps } from '../Icon.d.ts';

export const ${componentName} = (${propsString}: IconProps) => {
    return (
        ${modifiedSvgContent}
    );
};

${componentName}.displayName = '${componentName}';
`;
};

const generateComponentFiles = async (svgComponentMap) => {
  const components = [];

  for (const [componentName, svgFile] of Object.entries(svgComponentMap)) {
    const componentFilePath = path.resolve(
      COMPONENT_DIR,
      `${componentName}.tsx`
    );

    if (existsSync(componentFilePath)) {
      components.push(componentName);
      continue;
    }

    const svgFilePath = path.resolve(SVG_DIR, svgFile);
    const svgContent = (await fs.readFile(svgFilePath)).toString();

    const componentContent = createComponentContent(
      componentName,
      svgContent,
      svgFile
    );

    await fs.writeFile(componentFilePath, componentContent);
    components.push(componentName);
  }

  return components;
};

const generateExportFile = async (components) => {
  const EXPORT_FILE_PATH = path.resolve(__dirname, '../components/Icon/index.ts');
  const exportFileContent = components
    .map(
      (component) =>
        `export * from "./component/${component}.tsx";`
    )
    .join("\n");

  await fs.writeFile(EXPORT_FILE_PATH, exportFileContent);
};

(async () => {
  try {
    const svgComponentMap = await generateSvgComponentMap();
    await deleteUnusedComponentFiles(svgComponentMap);
    const components = await generateComponentFiles(svgComponentMap);
    await generateExportFile(components);
  } catch (error) {
    console.log("Error generating components:", error);
  }
})();
