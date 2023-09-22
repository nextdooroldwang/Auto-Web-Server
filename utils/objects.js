const fs = require("fs");
const path = require("path");

const buildHierarchy = (dirPath) => {
  const items = fs.readdirSync(dirPath);

  const result = [];

  items.forEach((item) => {
    const fullPath = path.join(dirPath, item);
    const stats = fs.statSync(fullPath);

    const node = {
      title: item,
      key: fullPath,
    };

    if (stats.isDirectory()) {
      node.children = buildHierarchy(fullPath);
    }

    result.push(node);
  });

  return result;
};

module.exports = {
  buildHierarchy,
};
