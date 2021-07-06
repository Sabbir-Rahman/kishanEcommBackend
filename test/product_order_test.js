
const chai = require('chai')
const request = require('supertest')
const app = require('../app')
var expect = chai.expect;

describe('Auth api', function () {
    this.timeout(10000)

    it('POST /product/add --> create a user', () => { 
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