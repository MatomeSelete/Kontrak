const multer = require("multer");
const path = require("path");

//Multer Config
module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb ) => {
        let ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpeg' && ext !== '.jpg'){
            cb('Message: image format not met');
            return
        }
        cb(null, true);
    },
});