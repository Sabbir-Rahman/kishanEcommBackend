
const chai = require('chai')
const request = require('supertest')
const app = require('../app')
var expect = chai.expect;

describe('Auth api', function () {
    this.timeout(10000)

    it('POST /auth/register --> create a user', () => { 
        return request(app)
        .post('/auth/register').send({
            fullname: 'Md Sabbir Rahman',
            email: 'test@gmail.com',
            password: 'password@1234',
            confpassword: 'password@1234'
        })
        .expect('Content-Type', /json/)
        .expect(400)
        
    })


    
    it('POST /auth/login --> login of a user', () => { 
        return request(app)
        .post('/auth/login').send({
            email: 'sabbirrahman42@iut-dhaka.edu',
            password: '123456'
        })
        .expect('Content-Type', /json/)
        .then((res)=>{
            console.log(res.body)
        })
        
    })

    it('POST /auth/login --> User not exist', () => { 
        return request(app)
        .post('/auth/login').send({
            email: 'usernai@iut-dhaka.edu',
            password: '123456'
        })
        .expect('Content-Type', /json/)
        .expect(404)
        
    })

    it('POST /auth/login --> Wrong password', () => { 
        return request(app)
        .post('/auth/login').send({
            email: 'test@gmail.com',
            password: '123'
        })
        .expect('Content-Type', /json/)
        .expect(400)
        
    })

    
})