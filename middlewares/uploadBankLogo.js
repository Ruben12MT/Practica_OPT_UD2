const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadsDir = path.join(__dirname, "../uploads/banks-logos");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    const id = req.params.id; 
    const extension = file.originalname.split(".").pop();
    cb(null, `${id}.${extension}`);
  }
});

const upload = multer({ storage });

module.exports = upload;