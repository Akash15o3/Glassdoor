/* eslint-disable */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./server');

chai.use(chaiHttp);
const api_host = 'http://localhost';
const api_port = "5000"
const api_url = api_host + ':' + api_port;

const expect = chai.expect;


describe('GlassDoor', () => {
  it('Get all customers', (done) => {
    chai
      .request(api_url)
      .get('/companies') 
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        done();
      })
  });
})


describe('GlassDoor', function(){
  it("Student login", function(done){
    let data1 = {
      role: "Student",
      email: "wrong@login.com",
      password: "wrong"
    }
    let data2 = {
      role: "Student",
      email: "student1@student1.com",
      password: "student1"
    }
    chai
      .request(api_url)
      .post('/login')
      .send(data1)
      .end(function(err, res) {
        expect(res).to.have.status(401);
      })

    chai
      .request(api_url)
      .post('/login')
      .send(data2)
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        done();
      })
    
  });
})

// Please run thsi test just once with new data2--it signs up a new employer
/*
describe('GlassDoor', function(){
  it("Employer signup", function(done){
    let data1 = {
      role: "Employer",
      email: "companyx@companyx.com",
      password: "companyx",
      name: "Existing employer"
    }

    let data2 = {
      role: "Employer",
      email: "new@employer.com",
      password: "new",
      name: "New employer"
    }
    chai
      .request(api_url)
      .post('/signup')
      .send(data1)
      .end(function(err, res) {
        expect(res).to.have.status(401);
    })

    chai
      .request(api_url)
      .post('/signup')
      .send(data2)
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
    })
     
    
  });
})
*/

describe('GlassDoor', () => {
  it('Get all reviews for company', (done) => {
    let data = {
      "cname": "employer1",
      "skip": 0,
      "limit": 10,
      "filter": "All"
    }
    chai
      .request(api_url)
      .post('/reviews/cname') 
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        done();
      })
  });
})

describe('GlassDoor', () => {
  it('Get applier demographics for a job', (done) => {
    chai
      .request(api_url)
      .get('/jobs/getApplierDemographics?aapplierid=5fc80c10f428901baa9850d5') 
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.a('object');
        done();
      })
  });
})


