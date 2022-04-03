const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/jpeg"
    ) {
      return cb(new Error("ניתן להעלות כתמונה רק קבצים מסוג PNG או JPG"));
    }
    cb(undefined, true);
  },
});

const editImage = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpg" &&
      file.mimetype !== "image/jpeg"
    ) {
      return cb(new Error("ניתן להעלות כתמונה רק קבצים מסוג PNG או JPG"));
    }
    cb(undefined, true);
  },
});

module.exports = {
  upload,
  editImage,
};
