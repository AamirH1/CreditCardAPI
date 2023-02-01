const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;

const app = require("../server");
const { string } = require("joi");

describe("Test cases", async () => {
    it("addNewCreditCard", async () => {
        await request(app).post("/addNewCreditCard").send({
            "cardHoldername": "Aamir",
            "cardNumber": "1358954993914435",
            "cardLimit": "1000"
        }).expect(200)

        await request(app).post("/addNewCreditCard").send({
            "cardHoldername": "Aamir",
            "cardNumber": "79927398714",
            "cardLimit": "1000"
        }).expect(401)

        await request(app).post("/addNewCreditCard").send({
            "cardHoldername": "Aamir",
            "cardNumber": "1358954993914435",
            "cardLimit": "1000"
        }).expect(201)
    });

    it("getAllCreditCard", async()=>{
        const response = await request(app).get("/getAllCreditCard").expect(200);
        expect(response.body[1358954993914435]['cardHoldername']).to.be.a('string','Aamir');
    });
})