const router = require('express').Router();
let User = require('../models/user.model');


router.route('/login').get((req, res) => {
    User.findOne()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add User
router.route('/add').post((req, res) => {
    const userName = req.body.userName;
    const userPassword = req.body.userPassword;
    const userType = req.body.userType;
    const companyName = req.body.companyName;
    const loginStatus = req.body.loginStatus;
    const newUser = new User({ userName:userName, userPassword: userPassword, userType: userType, companyName: companyName, loginStatus: loginStatus});

    newUser.save()
        .then((newduser) => {
            console.log("================== USER ADDED ==================\n", newduser);
            return res.json(newduser);
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json(err);
        });

});

// Dekete User 
router.route('/delete').post((req, res) => {
    const userName = req.body.userName;
    const userPassword = req.body.userPassword;
    const userType = req.body.userType;
    const companyName = req.body.companyName;
    const loginStatus = req.body.loginStatus;
    const newUser = new User({ userName:userName, userPassword: userPassword, userType: userType, companyName: companyName, loginStatus: loginStatus});

    
    User.deleteOne({ userName:userName, userPassword: userPassword, userType: userType, companyName: companyName }, function(err){
        if (err){
            console.log(err);
            return res.status(400).json(err);
        }else{
            console.log("================== USER DELETED ==================\n", newUser);
            return res.status(200);
        }
    });
});



// Find User by userName and userPassword
router.route('/authenticate').post((req, res) => {
    const userName = req.body.userName;
    const userPassword = req.body.userPassword;

    const filter = { userName: userName, userPassword: userPassword};
    const update = { loginStatus: "online" };

    //  returns the document as it was after update was applied
    User.findOneAndUpdate(filter, update, 
        { new: true,  useFindAndModify: false })
        .then(userobj => {
            if (userobj === null || userobj === undefined){
                return res.status(400).json(null);
            }else{
                console.log("================== USER AUTHENTICATED ===================\n", userobj);
                return res.json(userobj);
            }
        }).catch(err => {
            console.log(err);
            return res.status(400).json(err);
        });

});

router.route('/logout').post((req, res) => {
    const userName = req.body.userName;
    const userPassword = req.body.userPassword;

    const filter = { userName: userName, userPassword: userPassword};
    const update = { loginStatus: "offline" };

    //  returns the document as it was after update was applied
    User.findOneAndUpdate(filter, update, 
        { new: true })
        .then(userobj => {
            if (userobj === null || userobj === undefined){
                return res.status(400).json(null);
            }else{
                console.log("================== USER UPDATED LOGOUT ===================\n", userobj);
                return res.json(userobj)
            }
        }).catch(err => {
            console.log(err);
            return res.status(400).json(err);
        });

});

// Find User by userName and userPassword
router.route('/validateUserName').post((req, res) => {
    User.findOne({userName: req.body.userName})
        .then(username => {
            console.log("================== USERNAME SEARCH RESULT ==================\n", username);
            res.json(username)
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json(err);
        });
});




router.route('/edit').post((req, res) => {
    const oldUserName = req.body.oldUserName;
    const newUserName = req.body.newUserName;
    const oldPassword = req.body.userOldPassword;
    const newPassword = req.body.userNewPassword;
    let companyName = req.body.companyName;

    if (req.body.companyName) {
        companyName = req.body.companyName;
    }

    const update = {
        userName: newUserName,
        userPassword: newPassword,
        companyName: companyName,
    }

    User.findOneAndUpdate({ userName: oldUserName, userPassword: oldPassword}, update, 
        { new: true,  useFindAndModify: false })
        .then(userobj => {
            if (userobj == null){
                return res.status(401);
            }
            console.log("================== USER UPDATED ===================\n", userobj);
            return res.json(userobj);
        }).catch(err => {
            return res.status(400).json(err);
        });
});


module.exports = router;
