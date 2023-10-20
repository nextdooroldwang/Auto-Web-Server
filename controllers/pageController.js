const {
  buildHierarchy,
  deleteFileOrFolder,
  createFileOrFolder,
  createFolder,
  createFile,
  findFolderAndFile,
  getParentFolderOrFileName,
} = require("../utils/objects/file");

const { basePage, createPage, detailPage } = require("../templates/page/index");
const {
  baseController,
  createController,
  detailController,
} = require("../templates/hook/controller");
const {
  baseComponent,
  createComponent,
  detailComponent,
} = require("../templates/component/index");

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
    createFileOrFolder(path, basePage(getParentFolderOrFileName(path)));
    res.json(true);
  },
  createModule: (req, res) => {
    const { key, src, op } = req.body;
    console.log(req.body);
    const { isIndexPage, isAddPage, isDetailPage } = op;
    const type = findFolderAndFile(`${src}/pages`, key);
    if (type === "folder") {
      createFolder(`${src}/pages/${key}`);
    }
    if (isIndexPage) {
      createFile(`${src}/pages/${key}/index.tsx`, basePage(key));
      createFolder(`${src}/types/${key}`);
      createFile(`${src}/types/${key}/index.ts`, "");
      createFolder(`${src}/hook/request/${key}`);
      createFile(`${src}/hook/request/${key}/index.ts`, "");
      createFolder(`${src}/hook/controller/${key}`);
      createFile(
        `${src}/hook/controller/${key}/use${key}.ts`,
        baseController(key)
      );
      createFolder(`${src}/components/${key}`);
      createFile(`${src}/components/${key}/index.tsx`, baseComponent(key));
    }
    if (isAddPage) {
      createFile(`${src}/pages/${key}/create.tsx`, createPage(key));
    }
    if (isDetailPage) {
      createFile(`${src}/pages/${key}/[id].tsx`, detailPage(key));
    }
    res.json(true);
  },
};
