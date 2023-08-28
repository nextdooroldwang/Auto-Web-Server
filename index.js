const express = require("express");
const app = express();
const port = 3007; // 指定服务器端口

const fs = require("fs");
const path = require("path");

function buildHierarchy(dirPath) {
  const items = fs.readdirSync(dirPath);

  const result = [];

  items.forEach((item) => {
    const fullPath = path.join(dirPath, item);
    const stats = fs.statSync(fullPath);

    const node = {
      name: item,
    };

    if (stats.isDirectory()) {
      node.children = buildHierarchy(fullPath);
    }

    result.push(node);
  });

  return result;
}

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // 添加Authorization
  next();
});

// 自定义中间件：统一响应结构
app.use((req, res, next) => {
  // 重写 res.json 方法
  res.json = (data) => {
    const response = {
      code: 1000, // 默认成功状态码
      msg: "Success", // 默认成功消息
      data: data, // 传入的数据
    };

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(response));
  };

  next();
});

// 定义路由
app.get("/", (req, res) => {
  res.json({ data: "Hello, Node.js Server!" });
});

app.get("/product", (req, res) => {
  const folderPath = req.query.path;
  const allFiles = buildHierarchy(folderPath);
  res.json({ data: allFiles });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
