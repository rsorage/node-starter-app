const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

const errorHandler = require('./middlewares/errorHandler');

require('./models/User');
require('./models/Example');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useCreateIndex: true });

const app = express();

app.use(bodyParser.json());

require('./routes/example.route')(app);
require('./routes/user.route')(app);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('HTTP server closed.')
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection close.');
      process.exit(0);
    });
  });
});