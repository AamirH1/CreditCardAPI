const fs = require('fs');
const jsonFile = './data/data.json';
const Mongo = require('../utilities/MongoDB');

const mongo_cli = new Mongo();
let mongo_databse;

class RequestHandler {
    constructor() {
        mongo_databse = mongo_cli.connectDB('CardDetails');
    }
    async addNewCreditCard(reqBody) {
        try {
            const database = await mongo_databse;

            //validating credit card
            let is_valid = await this.validateCard(reqBody);
            if (!is_valid) {
                return { Error: 'Card Number validation Failed', status: 401 };
            }

            //check if card already exists
            let is_exists = await database.find({ cardNumber: reqBody.cardNumber }).toArray();
            console.log("Is_exists", is_exists);

            if (is_exists.length > 0) {
                return { response: 'Card Number already exists.', status: 201 };
            }

            //Formatting limit to string with £
            reqBody['balance'] = '£0';
            reqBody.cardLimit = `£` + (reqBody.cardLimit).toString();


            await database.insertOne(reqBody);
            /*fs.writeFileSync(jsonFile, JSON.stringify(jsonData))*/
            return { response: 'Card Details added', status: 200 };
        } catch (error) {
            console.log(error);
        }
    }

    async validateCard(reqBody) {
        //validating card number with luhn NPM package
        console.log("Validating through luhn algorithm");
        let cardNumber_tovalidate = reqBody.cardNumber;
        let alternate_digits = 0;
        let sum = 0;

        while (cardNumber_tovalidate) {
            let lastDigit = cardNumber_tovalidate % 10;
            let digit_double = (alternate_digits % 2 == 0) ? lastDigit : (lastDigit * 2);
            sum += digit_double > 9 ? (digit_double % 10 + (Math.floor(digit_double / 10)) % 10) : digit_double
            alternate_digits++;
            cardNumber_tovalidate = Math.floor(cardNumber_tovalidate / 10);
        }
        console.log("Sum: ", sum);
        if (sum % 10 != 0) {
            return false;
        }
        return true;
    }

    async getAllCreditCard() {
        try {

            const database = await mongo_databse;
            let findResult = await database.find({}).toArray();

            return findResult;
        } catch (error) {
            console.log("Error", error);
        }
    }
}

module.exports = RequestHandler


/*
12345674
79927398713
1358954993914435
*/