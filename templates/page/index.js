const { toCamelCase, toComponentName } = require("../../utils/objects/file");

function pageBase(fileName) {
  const name = toCamelCase(fileName);
  const componentname = toComponentName(fileName);
  return `
import ${componentname}Component from '@/components/${name}';

function ${componentname}Page() {
  return (
    <div className="${fileName}-page">
      <${componentname}Component />
    </div>
  );
}

export default ${componentname}Page;

    `;
}

module.exports = {
  pageBase,
};
