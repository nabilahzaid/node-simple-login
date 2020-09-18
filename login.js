require('dotenv').config();
// const mysql = require('mysql2');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 5;

const app = express();

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    }
});

// force: true will drop the table if it already exists
// User.sync({force: true}).then(() => {
    // Table created
//     return User.create({
//         firstName: 'John',
//         lastName: 'Hancock'
//     });
// });

User.findAll().then(users => {
    console.log(users)
  })
  .catch(err => {
    console.log("Error getting code",err);
  });
  
// sequelize.close();

app.listen(3000);