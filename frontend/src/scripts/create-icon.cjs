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

const deleteComponentFiles = async (svgComponentMap) => {
  if (!existsSync(COMPONENT_DIR)) {
    fs.mkdir(COMPONENT_DIR);
    return;
  }

  const componentFiles = (await fs.readdir(COMPONENT_DIR)).filter((file) => {
    return file.endsWith(".tsx");
  });

  await Promise.all(
    componentFiles.map((file) => {
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
  const propsString = `{ clickable = false, className, width = 24, height = 24${hasStroke || hasFill ? ` ${hasStroke ? ', stroke = "white"' : ""}${hasFill ? ', fill = "white"' : ""}` : ""}, ...rest }`;
  const modifiedSvgContent = svgContent
    .replace(/style="mask-type:luminance"/g, "MASK_TYPE_PLACEHOLDER")
    .replace(/data:image/g, "DATA_IMAGE_PLACEHOLDER") 
    .replace(/[-:](\w)/g, (_, letter) => letter.toUpperCase())
    .replace(/MASK_TYPE_PLACEHOLDER/g, "mask-type='luminance'")
    .replace(/DATA_IMAGE_PLACEHOLDER/g, "data:image")
    .replace(/<svg([^>]*)width="(\d+)"/g, `<svg$1width={width}`)
    .replace(/<svg([^>]*)height="(\d+)"/g, `<svg$1height={height || width}`)
    .replace(/<svg([^>]*)fill="[^"]*"([^>]*)>/, "<svg$1$2>")
    // .replace(/(<(?!rect)[^>]+)fill="([^"]+)"/g, `$1fill={fill}`)
    // .replace(/(<(?!rect)[^>]+)stroke="([^"]+)"/g, `$1stroke={stroke}`)
    .replace(
      /<svg([^>]*)>/,
      `<svg$1 aria-label="${iconName} icon" fill="none" className={className} style={{ cursor: clickable ? "pointer": "default", ...rest.style }} {...rest}>`
    );

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

  const folders = ["TooltipArrow"];
  const exportFolderContent = folders
    .map((folder) => `export * from "./component/${folder}";`)
    .join("\n");

  await fs.writeFile(EXPORT_FILE_PATH, `${exportFileContent}\n${exportFolderContent}`);
};

(async () => {
  try {
    const svgComponentMap = await generateSvgComponentMap();
    await deleteComponentFiles(svgComponentMap);
    const components = await generateComponentFiles(svgComponentMap);
    await generateExportFile(components);
  } catch (error) {
    console.log("Error generating components:", error);
  }
})();
