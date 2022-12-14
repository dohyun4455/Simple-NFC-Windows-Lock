const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();
const users = require('./routes/users');


const config = require('./config/database');

mongoose.connect(config.database, { useNewUrlParser: true });

// on connection
mongoose.connection.on('connected', () => {
  console.log(`Connected to database ${config.database}`);
});

// on error
mongoose.connection.on('error', (err) => {
  console.log(`Database error: ${err}`);
});

app.use(cors());
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/users', users);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// port number
const port = process.env.PORT || 80;

app.get('/', (req, res) => {
  res.send('<h1>서비스 준비중입니다...</h1>')
});

app.get('/login', (req, res) => {
  res.send('<h1>로그인이 필요합니다...</h1> <p>ID, password 필요하지요. ㅎㅎㅎ</p>')
});



// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
