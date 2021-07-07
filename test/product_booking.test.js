const chai = require('chai')
const request = require('supertest')
const app = require('../app')
var expect = chai.expect;
var token = ""
const dotenv = require('dotenv')
dotenv.config()

describe('Product payment api', function () {

    it('POST /auth/login --> login of test admin user for token', () => { 
        return request(app)
        .post('/auth/login').send({
            email: process.env.TEST_ADMIN_EMAIL,
            password: process.env.TEST_ADMIN_PASSWORD
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res)=>{
            token = res.body.token
        })
    })


    //this willl return 400 as no product for admin
    it('GET /product/payment/booking --> product booking payment info view', () => { 
        return request(app)
        .get('/product/payment/booking?product_id=')
        .set("Authorization", "Bearer " + token)
        .expect(400)
        .then((res)=>{
            expect(res.body.message).to.equal('Product not found')
           
        })
        
    })


    it('POST /product/payment/booking --> product order booking payment', () => { 
        return request(app)
        .post('/product/payment/booking')
        .set("Authorization", "Bearer " + token)
        .send(
            {
                "productId":"60e35a0f31092c2eb211b59f",
                "quantity":"30"
            }
        )
        .expect(200)
       
        
    })

    

})