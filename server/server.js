const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())
// require('./app/models/inventory.model.js');
require('./app/models/apply.model.js');
require('./app/models/company.model.js');
require('./app/models/job.model.js');
require('./app/models/review.model.js');
require('./app/models/user.model.js');

// Configuring the database

require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;


// Connecting to the database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection
.on('open', () => {
    console.log('Mongoose connection open');
})
.on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
});
// require('./app/routes/inventory.router.js')(app);
// require('./app/routes/applications.js')(app);
// require('./app/routes/companies.js')(app);
// require('./app/routes/jobs.js')(app);
// require('./app/routes/reviews.js')(app);
// require('./app/routes/users.js')(app);

const userRouter = require('./app/routes/users');
const jobRouter = require('./app/routes/jobs');
const companyRouter = require('./app/routes/companies');
const reviewRouter = require("./app/routes/reviews");
const applicationsRouter = require('./app/routes/applications');

app.use('/users', userRouter);
app.use('/jobs', jobRouter);
app.use('/companies', companyRouter);
app.use('/reviews', reviewRouter);
app.use('/applications', applicationsRouter);

// Create a Server
const server = app.listen(8080, function () { 
    const host = server.address().address
    const port = server.address().port
    console.log("App listening at http://%s:%s", host, port) 
})

mongoose.set('useCreateIndex', true);

//mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
    //.then(async () => {
        //console.log("Successfully connected to MongoDB.");   
        /*const customers = [
            { firstname: 'Jack', lastname: 'Smith', 
                      age: 23, address: '374 William S Canning Blvd'},
            { firstname: 'Adam', lastname: 'Johnson', 
                      age: 31, address: 'Fall River MA 2721. 121 Worcester Rd'},
            { firstname: 'Dana', lastname: 'Bay', 
                      age: 46, address: 'Framingham MA 1701. 677 Timpany Blvd'},
          ]
        for(let i=0; i<inventories.length; i++){
            const inventory = new Inventory({
                item: inventories[i].item,
                qty: inventories[i].qty,
                size: inventories[i].size,
                status: inventories[i].status
              });
            // Save a Customer in the MongoDB
            await inventory.save();
        }*/
    //}).catch(err => {
       // console.log('Could not connect to MongoDB.');
        //process.exit();
    //});