const router = require('express').Router();
let Review = require("../models/review.model");

// Shouldn't need get reviews as reviews will be sent with company info

// router.route('/reviews').get((req, res) => {
//     const companyName = req.query.companyName;
//     const filter = { company: companyName };

//     Review.find(filter)
//     .then((reviews) => {
//         console.log(reviews);
//         // if (! company) {
//         //     res.status(404).json("Error: Company not found!");
//         // } else {
//         //     res.json(company);
//         // }

//         // check if reviews empty and if not display them
//     })
//     .catch((err) => {
//         res.status(400).json('Error: ' + err)
//     });
// });

router.route('/addReview').post((req, res) => {
    const newReview = new Review({
        user: req.body.userName,
        company: req.body.companyName,
        stars: req.body.stars,
        desc: req.body.desc,
    });

    newReview.save()
        .then((newreview) => {
            console.log("ADDED: ", newreview);
            return res.json(newreview);
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json(err);
        });
    });


router.route('/getReviews').get((req, res) => {
    const companyName = req.query.companyName;
    console.log(companyName);
    const filter = { company: companyName };

    Review.find(filter)
        .then((reviews) => {
          console.log(reviews);
          res.json(reviews);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json('Error:' + err);
        });
});


module.exports = router;