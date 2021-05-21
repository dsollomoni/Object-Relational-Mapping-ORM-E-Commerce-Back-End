require("dotenv").config();

const Sequelize = require("sequelize");

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: "localhost",
      dialect: "mysql",
      dialectOptions: {
        multipleStatements: true,
        decimalNumbers: true,
      },
    });
sequelize.query(`DROP DATABASE IF EXISTS ecommerce_db;`);
sequelize.query(`CREATE DATABASE ecommerce_db;`);
module.exports = sequelize;
