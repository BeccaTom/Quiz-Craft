const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');

fs.readdir(__dirname, (err, files) => {
    if (err) {
        throw err;
    }
    files.forEach(file => {
        let fileName = path.basename(file, '.js');
        if (fileName !== 'index') {
            router.use(`/${fileName}`, require(`./${file}`));
        }
    });
  
});
module.exports = router;
