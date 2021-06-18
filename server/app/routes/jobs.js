const router = require('express').Router();
let Job = require('../models/job.model');

// Add Job
router.route('/addJob').post((req, res) => {
    const companyName = req.body.companyName;
    const jobTitle = req.body.jobTitle;
    const jobDesc = req.body.jobDesc;
    const salary = req.body.salary;
    const location = req.body.location;
    const deadline = req.body.deadline;

    const newJob = new Job({
        companyName: companyName,
        jobTitle: jobTitle,
        jobDesc: jobDesc,
        salary: salary,
        location: location,
        deadline: deadline
    });

    console.log(newJob);
    console.log("Saving now");
    newJob.save()
        .then(() => {
            console.log("Job added!");
            res.json('Job added!');
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json('Error:' + err);
        });
});

// view jobs
router.route('/viewJobs').get((req, res) => {
    const companyName = req.query.companyName;
    const filter = (companyName && companyName !== "undefined") ? { companyName: companyName } : {};
    console.log(filter);

    Job.find(filter)
        .then((jobs) => {
          console.log("Jobs found");
          console.log(jobs);  
          res.json(jobs);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json('Error:' + err);
        });
});

// view jobs
router.route('/editJob').post((req, res) => {
    const companyName = req.body.companyName;
    const jobTitle = req.body.jobTitle;

    const filter = { 
        companyName: companyName,
        jobTitle: jobTitle,
    };

    const update = {
        jobDesc: req.body.jobDesc,
        salary: req.body.salary,
        location: req.body.location,
        deadline: req.body.deadline
    }

    Job.findOneAndUpdate(filter, update)
        .then((result) => {
          console.log(result);  
          res.json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json('Error:' + err);
        });
});

//Delete Job
router.route('/delete').post((req, res) => {
    const companyName = req.body.companyName;
    const jobTitle = req.body.jobTitle;

    const filter = { 
        companyName: companyName,
        jobTitle: jobTitle,
    };

    Job.deleteOne(filter)
        .then((result) => {
          console.log("-- Job deleted -- ");
          console.log(result);  
          res.json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json('Error:' + err);
        });
});

module.exports = router;
