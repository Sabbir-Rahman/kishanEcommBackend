const request = require("supertest");
const app = require('../app');

describe("GET /", () => {
  it("Server welcome response", (done) => {
    request(app).get("/").expect("Hello from kishan backend", done);
  })
});