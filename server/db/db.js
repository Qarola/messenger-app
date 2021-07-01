require('dotenv').config();
const Sequelize = require("sequelize");
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME,
} = process.env;


const db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, 
  native: false, 
});

module.exports = db;















