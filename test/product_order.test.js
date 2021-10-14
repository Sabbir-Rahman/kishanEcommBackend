
const chai = require('chai')
const request = require('supertest')
const app = require('../app')
var expect = chai.expect;
var token = ""
var tokenSeller = ""
var tokenBuyer = ""
const dotenv = require('dotenv')
dotenv.config()

describe('Product order api', function () {

    it('POST /auth/login --> login of test buyer user for token', () => { 
        return request(app)
        .post('/auth/login').send({
            email: process.env.TEST_BUYER_EMAIL,
            password: process.env.TEST_BUYER_PASSWORD
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res)=>{
            token = res.body.token
        })
    })


    it('POST /auth/login --> login of test seller user for token', () => { 
        return request(app)
        .post('/auth/login').send({
            email: process.env.TEST_SELLER_EMAIL,
            password: process.env.TEST_SELLER_PASSWORD
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res)=>{
            tokenSeller = res.body.token
        })
    })

    it('POST /auth/login --> login of test buyer user for token', () => { 
        return request(app)
        .post('/auth/login').send({
            email: process.env.TEST_SELLER_EMAIL,
            password: process.env.TEST_SELLER_PASSWORD
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res)=>{
            tokenBuyer = res.body.token
        })
    })
 
    it('POST /product/order --> order same product that pending', () => { 
        return request(app)
        .post('/product/order')
        .set("Authorization", "Bearer " + token)
        .send(
            {
                "productId":"60e5e749c63d3c3104e9eab2",
                "quantity":"30"
            }
        )
        .expect(400)
       
        
    })

    it('POST /product/order --> order less than min order', () => { 
        return request(app)
        .post('/product/order')
        .set("Authorization", "Bearer " + tokenBuyer)
        .send(
            {
                "productId":"60e5e749c63d3c3104e9eab2",
                "quantity":"3"
            }
        )
        .expect(400)
        // .then((res)=>{
        //     expect(res.body.message).to.equal('Please order atleast the minimum amount')
        // })
        
    })


    it('POST /product/order --> order than max order', () => { 
        return request(app)
        .post('/product/order')
        .set("Authorization", "Bearer " + tokenBuyer)
        .send(
            {
                "productId":"60e5e749c63d3c3104e9eab2",
                "quantity":"90000"
            }
        )
        .expect(400)
        // .then((res)=>{
        //     expect(res.body.message).to.equal('Please order less than available amount')
        // })
        
    })

    it('POST /product/order --> order less than min order', () => { 
        return request(app)
        .post('/product/order')
        .set("Authorization", "Bearer " + tokenBuyer)
        .send(
            {
                "productId":"60e5ecd9a74dee39f2769f91"
               
            }
        )
        .expect(400)
        // .then((res)=>{
        //     expect(res.body.message).to.equal('You must add quantity')
        // })
        
    })

    it('POST /product/order --> product not exist', () => { 
        return request(app)
        .post('/product/order')
        .set("Authorization", "Bearer " + tokenBuyer)
        .send(
            {
                "productId":"60e35a0f31092c111111b59f"
            }
        )
        .expect(400)
        .then((res)=>{
            expect(res.body.message).to.equal('Product not find')
        })
        
    })

    it('POST /product/orderWrong --> order product wrong url', () => { 
        return request(app)
        .post('/product/orderWrong')
        .set("Authorization", "Bearer " + token)
        .expect(404)
        
    })

    it('POST /product/orderWrong --> order product without token', () => { 
        return request(app)
        .post('/product/order')
        .expect(401)
        
    })

    it('GET /product/order/buyRequest --> product buy request all view', () => { 
        return request(app)
        .get('/product/order/buyRequest')
        .set("Authorization", "Bearer " + token)
        .expect(200)
        .then((res)=>{
            expect(res.body.message).to.equal('Product order buy request view succesfully')
            
            // if(res.body.data[0]){
            // expect(res.body.data[0]['status']).to.equal('pending')
            // }
        })
        
    })

    it('GET /product/order/buyRequest --> product buy request pending view', () => { 
        return request(app)
        .get('/product/order/buyRequest?status=pending')
        .set("Authorization", "Bearer " + token)
        .expect(200)
        .then((res)=>{
            expect(res.body.message).to.equal('Product order buy request view succesfully')
            
            if(res.body.data[0]){
            expect(res.body.data[0]['status']).to.equal('pending')
            }
        })
        
    })

    it('GET /product/order/buyRequest --> product buy request accepted view', () => { 
        return request(app)
        .get('/product/order/buyRequest?status=accepetd')
        .set("Authorization", "Bearer " + token)
        .expect(200)
        .then((res)=>{
            expect(res.body.message).to.equal('Product order buy request view succesfully')
            
            if(res.body.data[0]){
            expect(res.body.data[0]['status']).to.equal('accepted')
            }
        })
        
    })

    it('GET /product/order/buyRequest --> product buy request booked view', () => { 
        return request(app)
        .get('/product/order/buyRequest?status=booked')
        .set("Authorization", "Bearer " + token)
        .expect(200)
        .then((res)=>{
            expect(res.body.message).to.equal('Product order buy request view succesfully')
            
            if(res.body.data[0]){
            expect(res.body.data[0]['status']).to.equal('booked')
            }
        })
        
    })

    it('GET /product/order/buyRequest --> product buy request paid view', () => { 
        return request(app)
        .get('/product/order/buyRequest?status=paid')
        .set("Authorization", "Bearer " + token)
        .expect(200)
        .then((res)=>{
            expect(res.body.message).to.equal('Product order buy request view succesfully')
            
            if(res.body.data[0]){
            expect(res.body.data[0]['status']).to.equal('paid')
            }
        })
        
    })


    //as already accepted
  
    it('POST /product/order/accept --> Accept the order of the product', () => { 
        return request(app)
        .post('/product/order/accept')
        .set("Authorization", "Bearer " + tokenSeller)
        .send(
            {
                "productId":"60e35a0f31092c2eb211b59f"
               
            }
        )
        .expect(400)
        // .then((res)=>{
        //     expect(res.body.message).to.equal('Product order accepted succesfully')
            
        // })
        
    })

    it('POST /product/order/accept --> product not exist in buy request', () => { 
        return request(app)
        .post('/product/order/accept')
        .set("Authorization", "Bearer " + tokenSeller)
        .send(
            {
                "productId":"60e35a0f34092c13111b59f"
            }
        )
        .expect(400)
        // .then((res)=>{
        //     expect(res.body.message).to.equal('Product not find for in your buy request')
        // })
        
    })

    //no order request for test admin
    it('GET /product/order/orderRequest --> product order request all view', () => { 
        return request(app)
        .get('/product/order/orderRequest')
        .set("Authorization", "Bearer " + token)
        .expect(200)
        // .then((res)=>{
        //     expect(res.body.message).to.equal('Product order buy request view succesfully')
            
        //     // if(res.body.data[0]){
        //     // expect(res.body.data[0]['status']).to.equal('pending')
        //     // }
        // })
        
    })

    it('GET /product/order/orderRequest --> product order request pending view', () => { 
        return request(app)
        .get('/product/order/orderRequest?status=pending')
        .set("Authorization", "Bearer " + token)
        .expect(200)
        .then((res)=>{
            //expect(res.body.message).to.equal('Product order buy request view succesfully')
            
            if(res.body.data[0]){
            expect(res.body.data[0]['status']).to.equal('pending')
            }
        })
        
    })

    it('GET /product/order/orderRequest --> product order request accepted view', () => { 
        return request(app)
        .get('/product/order/orderRequest?status=accepetd')
        .set("Authorization", "Bearer " + token)
        .expect(200)
        .then((res)=>{
            //expect(res.body.message).to.equal('Product order buy request view succesfully')
            
            if(res.body.data[0]){
            expect(res.body.data[0]['status']).to.equal('accepted')
            }
        })
        
    })

    it('GET /product/order/orderRequest --> product order request booked view', () => { 
        return request(app)
        .get('/product/order/orderRequest?status=booked')
        .set("Authorization", "Bearer " + token)
        .expect(200)
        .then((res)=>{
            //expect(res.body.message).to.equal('Product order buy request view succesfully')
            
            if(res.body.data[0]){
            expect(res.body.data[0]['status']).to.equal('booked')
            }
        })
        
    })

    it('GET /product/order/orderRequest --> product order request paid view', () => { 
        return request(app)
        .get('/product/order/orderRequest?status=paid')
        .set("Authorization", "Bearer " + token)
        .expect(200)
        .then((res)=>{
            //expect(res.body.message).to.equal('Product order buy request view succesfully')
            
            if(res.body.data[0]){
            expect(res.body.data[0]['status']).to.equal('paid')
            }
        })
        
    })


})