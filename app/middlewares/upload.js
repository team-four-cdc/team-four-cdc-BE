const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../images/'));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${file.originalname.match(/\..*$/)[0]}`
    );
  },
});

const multerFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image')) {
    return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'));
  }

  cb(null, true);
  return false;
};

const upload = multer({
  storage,
  fileFilter: multerFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});

const uploadCover = upload.single('picture');

module.exports = { uploadCover };
