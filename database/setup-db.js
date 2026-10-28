const fs = require('fs')
require('dotenv').config() // reading variable from .env file 

const sql = fs.readFileSync(__dirname + '/setup.sql').toString()

const db = require('./db')

db.query(sql)
    .then(data => console.log('Set-up complete.'))
    .catch(error => console.log(error))