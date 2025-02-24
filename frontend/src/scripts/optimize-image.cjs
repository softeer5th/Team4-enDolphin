const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const IMAGES_DIR = path.resolve(__dirname, "../../public/images");
const BREAKPOINTS = [
  { width: 480, suffix: '-480w' },
  { width: 768, suffix: '-768w' },
  { width: 1280, suffix: '-1280w' },
];

const convertImagesToWebP = async () => {
  try {
    if (!fs.existsSync(IMAGES_DIR)) {
      fs.mkdirSync(IMAGES_DIR);
    }

    const folders = fs.readdirSync(IMAGES_DIR);
    for (const folder of folders) {
      const FOLDER_PATH = path.join(IMAGES_DIR, folder);

      if (fs.statSync(FOLDER_PATH).isDirectory()) {
        const files = fs.readdirSync(FOLDER_PATH);

        console.log(`🔄 ${files.length}개의 이미지를 변환 중...`);

        for (const file of files) {
          const FILE_PATH = path.join(FOLDER_PATH, file);
          if (fs.statSync(FILE_PATH).isFile() && /\.(png|jpg|jpeg)$/i.test(file)) {
            const OUTPUT_FILE_PATH = path.join(FOLDER_PATH, file.replace(/\.(png|jpg|jpeg)$/i, ".webp"));

            await sharp(FILE_PATH)
              .toFormat("webp")
              .webp({ quality: 80 })
              .toFile(OUTPUT_FILE_PATH);
            
            console.log(`✅ 변환 완료: ${OUTPUT_FILE_PATH}`);
            fs.unlinkSync(FILE_PATH); 
          }

          for (const { width, suffix } of BREAKPOINTS) {
            const RESIZED_FILE_PATH = path.join(FOLDER_PATH, file.replace(/\.webp$/i, `${suffix}.webp`)); 
            await sharp(FILE_PATH)
              .resize(width)
              .toFile(RESIZED_FILE_PATH);
            console.log(`✅ 리사이징 완료: ${RESIZED_FILE_PATH}`);
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