import multer from "multer";
import path from "path";

export const multerConfig = {
  storage: multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve(__dirname, "..", "..", "tmp"));
  },
  filename: function (req, file, callback) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, `${uniquePrefix}-${file.originalname}`);
  },
})};
