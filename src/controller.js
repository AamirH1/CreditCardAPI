const fs = require("fs");
const { func, number } = require("joi");
const jsonFile = "./data/data.json";

class RequestHandler {

    addNewCreditCard(reqBody) {

        //validating card with luan Algo..
        console.log("Card Validation in progress..");
        let cardNumber_toValidate = reqBody.cardNumber;
        let alternate_digit = 0;
        let sum = 0;

        while (cardNumber_toValidate) {
            let lastDigit = cardNumber_toValidate % 10;
            let digit_double = (alternate_digit % 2 == 0) ? lastDigit : (lastDigit * 2);
            sum += digit_double > 9 ? (digit_double % 10 + (Math.floor(digit_double / 10)) % 10) : digit_double
            alternate_digit++;
            cardNumber_toValidate = Math.floor(cardNumber_toValidate / 10);
        }
        console.log("Sum: ", sum);

        if (sum % 10 != 0) {
            console.log("Cad Number Validation Failed");
            return { Error: "Cad Number Validation Failed" };
        }

        //fetching allcredit carddetails and appending new one.
        let jsonData = this.getAllCreditCard();
        let cardNumber = reqBody.cardNumber;

        if (jsonData[cardNumber]) {
            console.log("Card Number already exist");
            return { response: "Card Number already exist" };
        }

        reqBody["balance"] = "£0";
        reqBody.cardLimit = `£`+ (reqBody.cardLimit).toString();
        jsonData[cardNumber] = reqBody;

        fs.writeFileSync(jsonFile, JSON.stringify(jsonData));
        return { response: "Card details added" };

    }

    getAllCreditCard() {
        //opening File in 'w' mode if file doesn't exist
        if (!fs.existsSync(jsonFile)) {
            fs.open(jsonFile, 'w', function (err, file) {
                if (err) throw err;
                console.log("fileis opened in write mode");
            });
        }

        let jsonData = {};
        try {
            jsonData = JSON.parse(fs.readFileSync(jsonFile));            
        } catch (err) {
            console.log("No data in JSON file");
        }
        return jsonData;
    }

}


module.exports = RequestHandler;