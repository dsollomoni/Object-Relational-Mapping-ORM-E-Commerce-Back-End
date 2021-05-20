const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./routes');
const {Sequelize, Model, DataTypes} = require("sequelize");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});