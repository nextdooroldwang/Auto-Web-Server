const {
  buildHierarchy,
  deleteFileOrFolder,
  createFileOrFolder,
  findFolderAndFile,
  getParentFolderOrFileName,
} = require("../utils/objects/file");

const { pageBase } = require("../templates/page/index");

module.exports = {
  getPages: (req, res) => {
    const folderPath = req.query.path;
    const allFiles = buildHierarchy(folderPath);
    res.json(allFiles);
  },
  deletePage: (req, res) => {
    const { path } = req.body;
    deleteFileOrFolder(path);
    res.json(true);
  },
  createPage: (req, res) => {
    const { path } = req.body;
    createFileOrFolder(path, pageBase(getParentFolderOrFileName(path)));
    res.json(true);
  },
  createModule: (req, res) => {
    const { key, src } = req.body;
    const type = findFolderAndFile(`${src}/pages`, key);
    console.log(type);
    // createFileOrFolder(path, pageBase(getParentFolderOrFileName(path)));
    res.json(true);
  },
};
