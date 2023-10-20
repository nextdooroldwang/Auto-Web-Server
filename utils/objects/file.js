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
// 删除文件夹及其内容的函数
function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);

      if (fs.lstatSync(curPath).isDirectory()) {
        // 递归删除子文件夹
        deleteFolderRecursive(curPath);
      } else {
        // 删除文件
        fs.unlinkSync(curPath);
      }
    });

    // 删除空文件夹
    fs.rmdirSync(folderPath);
    console.log(`Folder ${folderPath} has been deleted.`);
  }
}

// 删除文件的函数
function deleteFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`File ${filePath} has been deleted.`);
  }
}

// 删除文件或文件夹的函数
function deleteFileOrFolder(targetPath) {
  if (!targetPath.includes(".")) {
    // 如果是文件夹，执行删除文件夹的操作（包括内容）
    deleteFolderRecursive(targetPath);
  } else {
    // 如果是文件，执行删除文件的操作
    deleteFile(targetPath);
  }
}

// 新建文件夹的函数
function createFolder(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.log(`Folder ${folderPath} has been created.`);
  } else {
    console.log(`Folder ${folderPath} already exists.`);
  }
}

// 新建文件的函数
function createFile(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`File ${filePath} has been created.`);
  } else {
    console.log(`File ${filePath} already exists.`);
  }
}

// 新建文件或文件夹的函数
function createFileOrFolder(targetPath, content) {
  if (!targetPath.includes(".")) {
    // 如果是文件夹，执行新建文件夹的操作
    createFolder(targetPath);
  } else {
    // 如果是文件，执行新建文件的操作
    createFile(targetPath, content);
  }
}

function toComponentName(input) {
  return input
    .toLowerCase()
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
    .replace(/^\w/, (char) => char.toUpperCase());
}
function toCamelCase(input) {
  return input
    .toLowerCase()
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase());
}
function getParentFolderOrFileName(filePath) {
  const fileName = path.basename(filePath, path.extname(filePath));

  if (fileName === "index") {
    const parentFolder = path.basename(path.dirname(filePath));
    return parentFolder;
  } else {
    return fileName;
  }
}
// 检查是否存在文件夹的函数
function folderExists(folderPath) {
  return fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory();
}

// 检查是否存在文件的函数
function fileExists(filePath) {
  return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
}

// 查找文件夹和文件的函数
function findFolderAndFile(path, key) {
  const folderPath = path + "/" + key; // 创建目标文件夹的路径
  const filePath = path + "/" + key + "/index.tsx"; // 创建目标文件的路径

  if (!folderExists(folderPath)) {
    return "folder"; // 文件夹不存在，返回'folder'
  } else if (!fileExists(filePath)) {
    return "file"; // 文件夹存在，但文件不存在，返回'file'
  } else {
    return "had"; // 文件夹和文件都存在，返回'had'
  }
}

module.exports = {
  buildHierarchy,
  deleteFileOrFolder,
  deleteFolderRecursive,
  deleteFile,
  createFileOrFolder,
  createFolder,
  createFile,
  toCamelCase,
  toCamelCase,
  toComponentName,
  getParentFolderOrFileName,
  folderExists,
  fileExists,
  findFolderAndFile,
};
