var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());
var mysql = require('mysql');
var knex = require("knex")({
    client:"mysql",
    connection:{
        host : 'localhost',
        user : 'root',
        password : 'navgurukul',
        database : 'salesTax'
    }
});
console.log("database is conected")
module.exports = knex