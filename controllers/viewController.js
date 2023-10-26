const {
  getTsxFiles,
  fileExists,
  deleteFile,
  createFile,
  copyFileSync,
  modifyFileToDart,
} = require("../utils/objects/file");
const { createLayout } = require("../templates/page/index");
const { editorPage } = require("../templates/component/editor");

module.exports = {
  getLayout: (req, res) => {
    const folderPath = req.query.path;
    const allFiles = getTsxFiles(folderPath);
    res.json(allFiles);
  },
  editComponent: (req, res) => {
    const { src, path, layout } = req.body;
    const editorPagePath = `${src}/pages/Sample/editor.tsx`;
    if (fileExists(editorPagePath)) {
      deleteFile(editorPagePath);
    }
    const match = path.match(/\/components\/.*?(?=\/[^/]*$)/);
    if (match) {
      const extractedPath = match[0];
      createFile(editorPagePath, editorPage(extractedPath));
    }

    copyFileSync(path, modifyFileToDart(path));
    if (fileExists(`${src}/pages/Sample/_layout.tsx`)) {
      deleteFile(`${src}/pages/Sample/_layout.tsx`);
    }
    createFile(`${src}/pages/Sample/_layout.tsx`, createLayout(layout));

    res.json(true);
  },
};
