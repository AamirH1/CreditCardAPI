const express = require("express");
const router = express.Router();
const Validator = require('../lib/joiValidation');
const RequestHandler = require('./controllers');

const joiValidation = new Validator();
const requestHandler = new RequestHandler();

router.get('/home', async(req, res) => {
    res.send("server is up and running..");
})

router.post('/addNewCreditCard', async(req, res) => {
    try {
        joiValidation.validate('addNewCreditCard', req.body);
    } catch (error) {
        if (error && error.details) res.send(error.details);
    }

    const result = await requestHandler.addNewCreditCard(req.body);
    res.status(result.status).send(result);
})

router.get('/getAllCreditCard', async(req, res) => {

    const result = await requestHandler.getAllCreditCard(req.body);
    res.send(result);
})

module.exports = router