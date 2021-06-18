let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    uuidv4 = require('uuid'),
    router = express.Router();

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "application/pdf") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .pdf format allowed!'));
        }
    }
});


let Apply = require('../models/apply.model');

router.post('/upload', upload.single('resume'), (req, res, next) => {
    //const url = req.protocol + '://' + req.get('host')

    const newApply = new Apply({
        _id: new mongoose.Types.ObjectId(),
        userName: req.body.userName,
        jobTitle: req.body.jobTitle,
        companyName: req.body.companyName,
        resume: '/public/' + req.file.filename
    });
    newApply.save().then((newApply) => {
        console.log("ADDED: ", newApply);
        return res.json(newApply);
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})

router.route("/list").get((req, res) => {
    const filter = { userName: req.query.userName };

    Apply.find(filter).then(apply => {
        if (!apply) {
            console.log("Inside error");
            res.status(404).json("Error: Application not found!");
        } else {
            res.json(apply);
        }
    });
});

router.route("/applicant").get((req, res) => {
    const filter = { companyName: req.query.companyName };

    Apply.find(filter).then(apply => {
        if (!apply) {
            console.log("Inside error");
            res.status(404).json("Error: Application not found!");
        } else {
            res.json(apply);
        }
    });
});

module.exports = router;
