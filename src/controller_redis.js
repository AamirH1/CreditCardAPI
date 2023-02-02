const Redis_cli = require('../utilities/Redis');


let redis_client = new Redis_cli();
let redis_cli;
class RequestHandler {
    constructor() {
        redis_cli = redis_client.connect_redis();
    }
    async addNewCreditCard(reqBody) {
        try {

            //validating credit card
            let is_valid = await this.validateCard(reqBody);
            console.log('is_valid:',is_valid);
            if (!is_valid) {
                return { response: 'Card Number validation Failed', status: 401 };
            }
            let cardNumber = reqBody.cardNumber;
            //check if card already exists
            let is_exists = await redis_cli.get(`creditCardNumber_${cardNumber}`);
            console.log("Is_exists", is_exists);

            if (is_exists && is_exists.length > 0) {
                return { response: 'Card Number already exists.', status: 201 };
            }

            //Formatting limit to string with £
            reqBody['balance'] = '£0';
            reqBody.cardLimit = `£` + (reqBody.cardLimit).toString();


            const result = await redis_cli.set(`creditCardNumber_${cardNumber}`, JSON.stringify(reqBody));
            console.log("Result", result)
            //return { response: 'Card Details added', status: 200,result:reqBody };
            return { response: reqBody, status: 200 };
        } catch (error) {
            console.log(error)
        }
    }

    async getAllCreditCard() {
        try {
            let jsonData = [];
            const keys = await redis_cli.keys('*');
            console.log("Keyss", keys);
            for (let i = 0; i < keys.length; i++) {
                let rediscli_val = await redis_cli.get(keys[i]);
                jsonData.push(JSON.parse(rediscli_val));
            }
            if (jsonData.length == 0) {
                return { response: "No Data Available." };
            }
            return jsonData;
        } catch (error) {
            console.log("Error", error);
        }
    }
    
    async validateCard(reqBody) {
        //validating card number with luhn algorithm
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

}

module.exports = RequestHandler;


/*
12345674
79927398713
1358954993914435
*/