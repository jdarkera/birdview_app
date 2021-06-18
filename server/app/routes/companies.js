const router = require('express').Router();
let Company = require('../models/company.model');
let Review = require("../models/review.model");


// Get Company
router.route('/').post((req, res) => {
    // console.log("COMPANY TO SEARCH: ", req.body);

    // If no document is found, it returns an error (= new user)
    Company.findOne({companyName: req.body.companyName})
        .then(companies => {
            console.log("================== COMPANY SEARCH RESULT ==================\n", companies);
            res.json(companies)
        })
        .catch(err => res.status(400).json(err));
});

//Get company info
router.route('/info').get((req, res) => {
    const companyName = req.query.companyName;
    const filter = { companyName: companyName };

    Company.findOne(filter)
        .then((company) => {
            if (! company) {
                console.log("Inside error");
                res.status(404).json("Error: Company not found!");
            } else {
                res.json(company);
            }
        })
        .catch((err) => {
            res.status(400).json('Error: ' + err)
        });
});


// Add Company
router.route('/add').post((req, res) => {

    const newCompany = new Company({ 
        companyName: req.body.companyName,
        companyWebsite: req.body.companyWebsite,
        companyType: req.body.companyType,
        companySize: req.body.companySize,
        companyHeadquaters: req.body.companyHeadquaters,
        companyFounded: req.body.companyFounded,
        companySector: req.body.companySector,
        companyAbout: req.body.companyAbout,
        companyJobs: req.body.companyJobs,
        companyReviews: req.body.companyReviews,
    });

    console.log("-----company check backend ------", newCompany);
    newCompany.save()
        .then((newcompany) => {
            console.log("================== COMPANY ADDED ==================\n", newcompany);
            return res.json(newcompany);
        })
        .catch(err => {
            console.log("-----company add failed / already exists backend ------");
            console.log(err);
            return res.status(400).json(err);
        });

});

// Edit company 
router.route('/edit').post((req, res) => {
    const companyName = req.body.companyName;

    const filter = { 
        companyName: companyName,
    };

    const update = {
        companyAbout: req.body.companyAbout,
        companySize: req.body.companySize,
        companyFounded: req.body.companyFounded,
        companyHeadquaters: req.body.companyHeadquaters,
        companyWebsite: req.body.companyWebsite,
    }

    Company.findOneAndUpdate(filter, update)
        .then((result) => {
          console.log(result);  
          res.json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json('Error:' + err);
        });
});

// Delete company 
router.route('/delete').post((req, res) => {
    const companyName = req.body.companyName;
    const companyWebsite = req.body.companyWebsite;
    const companyType = req.body.companyType;

    const newCompany = new Company({ 
        companyName: companyName,
        companyWebsite: companyWebsite,
        companyType: companyType,
    });

    
    Company.deleteOne({ companyName: companyName, companyWebsite: companyWebsite, companyType: companyType}, function(err){
        if (err){
            return res.status(400).json(err);
        }else{
            console.log("================== COMPANY DELETED ==================\n", newCompany);
            return res.status(200);
        }
    });
});


router.route('/getCompanies').get((req, res) => {
    const filter = { };
    Company.find(filter)
        .then((companies) => {
            console.log("companies retrieved");
            res.json(companies);
        })
        .catch((err) =>{
            console.log(err);
            res.status(400).json('Error:' + err);
        });
});




module.exports = router;