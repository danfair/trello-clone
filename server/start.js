// const mongoose = require('mongoose');
// const Sequelize = require('sequelize');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle an bad connections
// mongoose.connect(process.env.DATABASE, {
//   useMongoClient: true
// });
// mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
// mongoose.connection.on('error', (err) => {
//   console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
// });







// User.hasMany(Group);
// Group.belongsTo(User);

// Group.create({
//   name: 'Group Six',
//   userId: 3,
// })

// Group.findById(6, {
//   include: [
//     {
//       model: User
//     }
//   ]
// }).then(group => {
//   console.log(group.user.message);
// })

// Test.create({
//   test: 234123,
//   message: 'hi there',
// });



// READY?! Let's go!

// import all of our models
// require('./models/Store');
// require('./models/User');
// require('./models/Review');
const models = require('./models');

// Start our app!
const app = require('./server');
models.sequelize.sync().then(function () {
  app.set('port', process.env.PORT || 7777);
  const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });
});