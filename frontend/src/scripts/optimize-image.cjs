const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const IMAGES_DIR = path.resolve(__dirname, "../../public/images");

const convertImagesToWebP = async () => {
  try {
    if (!fs.existsSync(IMAGES_DIR)) {
      fs.mkdirSync(IMAGES_DIR);
    }

    const folders = fs.readdirSync(IMAGES_DIR);
    for (const folder of folders) {
      const folderPath = path.join(IMAGES_DIR, folder);

      if (fs.statSync(folderPath).isDirectory()) {
        const files = fs.readdirSync(folderPath);

        console.log(`🔄 ${files.length}개의 이미지를 변환 중...`);

        for (const file of files) {
          const filePath = path.join(folderPath, file);
          if (fs.statSync(filePath).isFile() && /\.(png|jpg|jpeg)$/i.test(file)) {
            const outputFilePath = path.join(folderPath, file.replace(/\.(png|jpg|jpeg)$/i, ".webp"));

            await sharp(filePath)
              .toFormat("webp")
              .webp({ quality: 80 })
              .toFile(outputFilePath);

            console.log(`✅ 변환 완료: ${outputFilePath}`);
            fs.unlinkSync(filePath); 
          }
        }
      }
    };
    console.log("🎉 모든 이미지 변환이 완료되었습니다!");
  } catch (error) {
    console.error("❌ 변환 중 오류 발생:", error);
  }
};

convertImagesToWebP();