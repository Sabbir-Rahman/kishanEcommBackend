
const chai = require('chai')
const request = require('supertest')
const app = require('../app')
var expect = chai.expect;
var token = ""
const dotenv = require('dotenv')
dotenv.config()

describe('Product order api', function () {

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

    it('POST /product/order --> order product', () => { 
        return request(app)
        .post('/product/order')
        .set("Authorization", "Bearer " + token)
        .send(
            {
                "productId":"60e35a0f31092c2eb211b59f",
                "quantity":"30"
            }
        )
        .expect(200)
       
        
    })

    it('POST /product/order --> order less than min order', () => { 
        return request(app)
        .post('/product/order')
        .set("Authorization", "Bearer " + token)
        .send(
            {
                "productId":"60e35a0f31092c2eb211b59f",
                "quantity":"3"
            }
        )
        .expect(400)
        .then((res)=>{
            expect(res.body.message).to.equal('Please order atleast the minimum amount')
        })
        
    })


    it('POST /product/order --> order than max order', () => { 
        return request(app)
        .post('/product/order')
        .set("Authorization", "Bearer " + token)
        .send(
            {
                "productId":"60e35a0f31092c2eb211b59f",
                "quantity":"30000"
            }
        )
        .expect(400)
        .then((res)=>{
            expect(res.body.message).to.equal('Please order less than available amount')
        })
        
    })

    it('POST /product/order --> order less than min order', () => { 
        return request(app)
        .post('/product/order')
        .set("Authorization", "Bearer " + token)
        .send(
            {
                "productId":"60e35a0f31092c2eb211b59f"
               
            }
        )
        .expect(400)
        .then((res)=>{
            expect(res.body.message).to.equal('You must add quantity')
        })
        
    })

    it('POST /product/order --> product not exist', () => { 
        return request(app)
        .post('/product/order')
        .set("Authorization", "Bearer " + token)
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

    //this will return 400 because its product accepted already
    it('POST /product/order/accept --> Accept the order of the product', () => { 
        return request(app)
        .post('/product/order/accept')
        .set("Authorization", "Bearer " + token)
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

    it('POST /product/order --> product not exist in buy request', () => { 
        return request(app)
        .post('/product/order/accept')
        .set("Authorization", "Bearer " + token)
        .send(
            {
                "productId":"60e35a0f31092c111111b59f"
            }
        )
        .expect(400)
        .then((res)=>{
            expect(res.body.message).to.equal('Product not find for in your buy request')
        })
        
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