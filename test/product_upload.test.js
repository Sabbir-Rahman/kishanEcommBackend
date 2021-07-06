
const chai = require('chai')
const request = require('supertest')
const app = require('../app')
var expect = chai.expect;
var token = ""
const dotenv = require('dotenv')
dotenv.config()

describe('Product upload api', function () {
   
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

    it('POST /product/add --> add product', () => { 
        return request(app)
        .post('/product/add')
        .set("Authorization", "Bearer " + token)
        .send(
            {
                "name":"product1",
                "description": "This is a product",
                "unitname": "kg",
                "unitPrize": "12.50",
                "available": "100",
                "minOrder": "30",
                "availableDate":"2021-11-23",
                "division": "Dhaka",
                "district": "Gazipur",
                "upazilla": "Gazipur Sadar",
                "isAvailableNow": false
            }
        )
        .expect(200)
        .then((res)=>{
            expect(res.body.message).to.equal('Add Product Succesfull')
        })
        
    })
    
    it('GET /product/view --> view product', () => { 
        return request(app)
        .get('/product/view')
        .expect(404)
        
        
    })

    it('GET /product/verify --> view product of admin', () => { 
        return request(app)
        .get('/product/verify')
        .set("Authorization", "Bearer " + token)
        .expect(200)
        .then((res)=>{
            expect(res.body.message).to.equal('View Product by admin Succesfull')
        })
        
    })

    it('POST /product/verify --> verify product of admin', () => { 
        return request(app)
        .post('/product/verify')
        .set("Authorization", "Bearer " + token)
        .send(
            {
                "productId":"60e3584ea06c012b97571248",
                "isVerified": true,
                "message": "Thanks for you effort your product islive"
                
            }
        )
        .expect(200)
        .then((res)=>{
            expect(res.body.message).to.equal('Verify Product Succesfull')
        })
        
    })


    it('POST /product/edit --> edit product', () => { 
        return request(app)
        .put('/product/update?id=60e35a0f31092c2eb211b592')
        .set("Authorization", "Bearer " + token)
        .expect(400)
        .then((res)=>{
            expect(res.body.message).to.equal("Product doesn't exist")
        })
        
    })

    it('POST /product/edit --> edit product', () => { 
        return request(app)
        .put('/product/update?id=60e3584ea06c012b97571248')
        .set("Authorization", "Bearer " + token)
        .expect(200)
        .then((res)=>{
            expect(res.body.message).to.equal("Edit Product Succesfull")
        })
        
    })

    

    // it('POST /auth/login --> User not exist', () => { 
    //     return request(app)
    //     .post('/auth/login').send({
    //         email: 'usernai@iut-dhaka.edu',
    //         password: '123456'
    //     })
    //     .expect('Content-Type', /json/)
    //     .expect(404)
        
    // })

    // it('POST /auth/login --> Wrong password', () => { 
    //     return request(app)
    //     .post('/auth/login').send({
    //         email: 'test@gmail.com',
    //         password: '123'
    //     })
    //     .expect('Content-Type', /json/)
    //     .expect(400)
        
    // })

    
})