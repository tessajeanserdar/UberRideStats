var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3000");


var server = supertest.agent("http://localhost:3000");

describe("Uber Authorization",function(){
  it("should return an auth URL",function(done){
    server
    .get("/api/login")
    .expect("Content-type",/json/)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });
});

describe("Uber Auth Callback",function(){
  it("should send 200 status and redirect user to totals",function(done){
    server
    .get("/api/callback")
    .expect("Content-type",/json/)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });
});


describe("Should send back users history",function(){
  it("should send 200 status and json of users History",function(done){
    server
    .get("/api/history")
    .expect("Content-type",/text/)
    .end(function(err,res){
      console.log(err)
      res.status.should.equal(200);
      done();
    });
  });
});