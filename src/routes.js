const express = require("express");
const router = express.Router();
const Validator = require("../lib/joiValidation");
const RequestHandler = require("./controller");

const joiValidation = new Validator();
const requestHandler = new RequestHandler();

router.get('/home', (req, res)=>{
    res.send("server is up and running..");
}) 


router.get('/getAllCreditCard', (req, res)=>{
    const result = requestHandler.getAllCreditCard(req.body);
    res.send(result);
})

router.post('/addNewCreditCard', (req, res) =>{
    try {
        joiValidation.validate('addNewCreditCard', req.body);
    } catch (error) {
        if (error && error.details) res.send(error.details);
    }

    const result = requestHandler.addNewCreditCard(req.body);
    res.send(result);
})

module.exports = router;