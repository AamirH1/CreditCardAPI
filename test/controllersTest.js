const request = require("supertest");
const chai = require('chai');
const expect = chai.expect;

const app = require("../server");


describe("Test cases", async () => {
    it("addNewCreditCard", async () => {
        await request(app).post("/addNewCreditCard").send({
            "cardNumber": 1358954993914435,
            "cardHolderName": "Ram",
            "cardLimit": 123.56
        }).expect(200)
        await request(app).post("/addNewCreditCard").send({
            "cardNumber": 12345674,
            "cardHolderName": "Jim",
            "cardLimit": 123.56
        }).expect(200)

        await request(app).post("/addNewCreditCard").send({
   
                "cardNumber": 79927398714,
                "cardHolderName": "Ben",
                "cardLimit": 123.33
       
        }).expect(401)

        await request(app).post("/addNewCreditCard").send({
            "cardNumber": 1358954993914435,
            "cardHolderName": "Sam",
            "cardLimit": 123.56
        }).expect(201)

    });

    it("getAllCreditCard", async () => {
        const response = await request(app).get("/getAllCreditCard").expect(200);
    });

})