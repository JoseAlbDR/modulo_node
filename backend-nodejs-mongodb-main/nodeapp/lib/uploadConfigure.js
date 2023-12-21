const multer = require('multer');
const path = require('path');

//* Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const filePath = path.join(__dirname, '..', 'public', 'avatars');
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    const filename =
      file.fieldname + '-' + Date.now() + '-' + file.originalname;
    cb(null, filename);
  },
});

//* Declare upload configuration
const upload = multer({
  storage,
});

module.exports = upload;
