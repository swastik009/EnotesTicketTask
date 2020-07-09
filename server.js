const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
var cors = require('cors');
const path = require('path');
//Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

const app = express();

//Body parser
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// var corsOptions = {
//   origin: 'localhost',
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

app.use(cors());

//Route files
const tokens = require('./routes/tokens');
//Set static folder
app.use(express.static(path.join(__dirname, 'public')));
//Mount Routes
app.use('/api/v1/tokens', tokens);
app.get('/api-docs', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/apiDoc.html'));
});
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  //close server & exit process
  server.close(() => process.exit(1));
});
