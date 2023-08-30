const express = require("express");
const router = express.Router();

// 导入控制器模块
const pageController = require("../controllers/pageController");

// 定义路由
router.get("/pages", pageController.getPages);

module.exports = router;
