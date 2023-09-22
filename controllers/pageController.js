const {
  buildHierarchy,
  deleteFileOrFolder,
  createFileOrFolder,
} = require("../utils/objects/file");
// 控制器操作
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
    createFileOrFolder(path, "");
    res.json(true);
  },
};
