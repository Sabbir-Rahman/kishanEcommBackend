
const chai = require('chai')
const request = require('supertest')
const app = require('../app')
var expect = chai.expect;
var token = ""
const dotenv = require('dotenv')
dotenv.config()

describe('Product upload api', function () {

    it('GET /product/view --> view product', () => { 
        return request(app)
        .get('/product/view')
        .expect(200)
        .then((res)=>{
            expect(res.body.message).to.equal("View Product by anyone Succesfull")
        })
        
        
    })

    it('GET /product/view --> view product not found test', () => { 
        return request(app)
        .get('/product/view/not found')
        .expect(404)
        
        
        
    })


    it('GET /product/view --> view product verified test', () => { 
        return request(app)
        .get('/product/view')
        .expect(200)
        .then((res)=>{
            expect(res.body.data[0]['isVerified']).to.equal(true)
        })
        
        
    })

})