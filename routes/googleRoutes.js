const express = require("express");
const router = express.Router();

// 导入控制器模块
const googleController = require("../controllers/googleController");

// 定义路由
router.get("/", googleController.client);
module.exports = router;
