const express = require("express");
const router = express.Router();

// 导入控制器模块
const viewController = require("../controllers/viewController");

// 定义路由
router.post("/", viewController.editComponent);
router.get("/layout", viewController.getLayout);
module.exports = router;
