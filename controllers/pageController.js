const { buildHierarchy } = require("../utils/objects");
// 控制器操作
module.exports = {
  getPages: (req, res) => {
    const folderPath = req.query.path;
    const allFiles = buildHierarchy(folderPath);
    res.json(allFiles);
  },
};
