
const chai = require('chai')
const request = require('supertest')
const app = require('../app')
var expect = chai.expect;

describe('Auth api', () => {

    it('POST /auth/register --> create a user', () => { 
        return request(app)
        .post('/auth/register').send({
            fullname: 'Md Sabbir Rahman',
            email: '3127teste12@gmail.com',
            password: 'password@1234',
            confpassword: 'password@1234'
        })
        .expect('Content-Type', /json/)
        .expect(400)
        
    })

    
})