Credit Card Application

It's a small credit card rest api aplication which allows you to add new credit card accounts and view them as a list. Luhn algorithm is used for card validation. I have used mongodb and redis as database in this app.

Steps to Setup
===============

1. Install Dependencies
>npm install

2. Run Server
> npm start

3. Run Test
> npm test

You can browse the api at http://localhost:3000
Home: http://localhost:3000/home


Payload for testing:
    {
        "cardNumber": 1358954993914435,
        "cardHolderName": "Roy",
        "cardLimit": "1000"
    },
    {
        "cardNumber": 12345674,
        "cardHolderName": "Jim",
        "cardLimit": "1000"
    }
    }
