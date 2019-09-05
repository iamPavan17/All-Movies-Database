const express = require('express');
const router = express.Router();
const Movie = require('../model/movies');
const multer = require('multer');
const path = require('path')
// Set storage engine
const storage = multer.diskStorage({
    destination: '../client/public/uploads',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//Init Upload
const upload = multer({
    storage: storage
});

//get - read
router.get('/', (req, res) => {
    Movie.find().then(movie => {
        res.send(movie)
    }).catch(err => {
        res.send(err)
    })
});

//post - create
router.post('/', upload.single('poster'), (req, res) => {
    // console.log(req.body.name)
    // console.log(`${req.file.destination}/${req.file.filename}`)
    req.body['poster'] = `uploads/${req.file.filename}`;
    // console.log(req.body)
    let movie = new Movie(req.body);
    movie.save().then(movie => {
        res.send(movie)
    }).catch(err => {
        res.send(err)
    })
})

module.exports = router;