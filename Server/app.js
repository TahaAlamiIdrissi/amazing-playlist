const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
require("dotenv/config");

const userRoutes = require('./routes/user');

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("Connected Successfully")
);
app.use(bodyParser.json());
app.use('/api/users',userRoutes);
app.listen(process.env.PORT, () =>
  console.log("Listening on PORT " + process.env.PORT)
);
