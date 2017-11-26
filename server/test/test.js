import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const should = chai.should();
chai.use(chaiHttp);

describe('Centers', function() {
  it('should list ALL centers on /centers GET', function(done) {
    chai.request(app)
      .get('/api/v1/centers')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.centers[0].should.have.property('id');
        res.body.centers[0].should.have.property('name');
        res.body.centers[0].should.have.property('facilities');
        res.body.centers[0].should.have.property('location');
        res.body.centers[0].should.have.property('description');
        done();
      });
  });

  it('should add a SINGLE center on centers/ POST', function(done) {
    chai.request(app)
      .post('/api/v1/centers')
      .send( {
        name:"Balmoral",
        location: "Ojota, Lagos State",
        facilities: "Projector, Stage lights",
        description: "A world class event center with ample car park space",
    })
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');  
        done();
      });
  });
  it('should list a single center on /centers GET', function(done) {
    chai.request(app)
      .get('/api/v1/centers/1')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.message.should.have.property('id');
        done();
      });
  });

  it('should update a center detail PUT', function(done) {
    chai.request(app)
      .get('/api/v1/centers/1')
      .send({
        name:"Toluwani"
    })
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.message.should.have.property('id');
        done();
      });
  });

  
});

 