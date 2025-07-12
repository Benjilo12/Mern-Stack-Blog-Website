import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({}),
  limits: {
    fieldSize: 10 * 1024 * 1024, // 10 MB limit for text fields
  },
});

export default upload;
