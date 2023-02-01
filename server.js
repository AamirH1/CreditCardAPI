const express = require("express");
const bodyParser = require("body-parser");
const routes = require('./src/routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', routes);
module.exports = app;

app.listen(3000, ()=>{
    console.log("server started on port:3000");
}) 