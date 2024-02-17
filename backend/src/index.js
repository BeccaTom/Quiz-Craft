const express = require('express');
const cors = require('cors');
const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads/')
    },
    filename: function (req, file, cb) {
        let extname = path.extname(file.originalname);
        cb(null, Date.now() + extname)
    }
})
const upload = multer({
    storage: storage,
    limits: { fieldSize: 25000 * 1024 * 1024 }
})
const app = express();
app.use(cors());
app.use(express.static('./src/uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/upload', upload.single('file'), function (req, res, next) {
    res.json({
        code: 200,
        message: "Upload successful!",
        data: {
            imgUrl: `/${req.file.filename}`
        }
    });
})

app.use('/', require('./router'));

app.listen(5001, () => {
    console.log('the server is running:localhost:5001');
});
