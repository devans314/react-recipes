const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const path = require('path');
require('dotenv').config();


mongoose.set('useCreateIndex', true);

require('./db/db');
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('short'));

const corsOptions = {
  origin: process.env.REACT_APP_ADDRESS,
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));


const store = new MongoDBStore({
  uri: process.env.MONGODB_URI  || "mongodb://heroku_dbr6711m:54g82a25dfndp3gp7fsltt4qkf@ds047075.mlab.com:47075/heroku_dbr6711m",
  collection: 'mySessions'
});

store.on('connected', function() {
  store.client; 
});

// Catch errors
store.on('error', function(error) {
  console.log(error);
});

app.use(session({
  secret: 'shhhhhh',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));


// app.use((req, res, next)=>{
//     if(req.session.message){
//       res.locals.message = req.session.message;
//       delete req.session.message;
//     }
//     next();
//   })
  // ^^ will send messages to the user that only last for 1 page refresh, err.message to send error messages
  // app.use() user on this page to get their info if they're logged in
  
// app.use(async (req, res, next) =>{
//   res.locals.user = req.session.user || {};
// next()
// });

// Controllers
const authController = require('./controllers/authController');
const recipeController = require('./controllers/recipeController');
const userController = require('./controllers/userController')

// These dictate the url paths
app.use('/api/v1/user', userController);
app.use('/api/v1/recipe', recipeController);
app.use('/api/v1/auth', authController);
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
const port = process.env.PORT || 9001;
app.listen(port);


