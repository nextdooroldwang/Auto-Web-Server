const path = require("path");

module.exports = {
  client: (req, res) => {
    async function quickstart() {
      const { ImageAnnotatorClient } = require("@google-cloud/vision").v1;
      const client = new ImageAnnotatorClient();

      // 使用 path 模块来构建图像文件的绝对路径
      const imagePath = path.join(__dirname, "resources", "img.jpg");

      // Performs label detection on the image file
      const [result] = await client.labelDetection(imagePath);
      const labels = result.labelAnnotations;
      console.log("Labels:");
      labels.forEach((label) => console.log(label.description));
    }
    quickstart();
    res.json(true);
  },
};
