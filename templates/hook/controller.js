const { toComponentName } = require("../../utils/objects/file");

function baseController(fileName) {
  return `
    export default function use${toComponentName(fileName)} () {
        return {};
    }
      
    `;
}

function createController(fileName) {
  return `
    export default function useCreate${toComponentName(fileName)} () {
        return {};
    }
      
    `;
}

function detailController(fileName) {
  return `
    export default function use${toComponentName(fileName)}Detail (id: string) {
        return {};
    }
      
    `;
}

module.exports = {
  baseController,
  createController,
  detailController,
};
