/**
  * API Endpoint Tests for database
  */
import chai from 'chai';
import supertest from 'supertest';
import app from '../app';
import models from '../models';

const should = chai.should();
const expect = require('chai').expect;

const request = supertest(app);
const { users, Events, Centers } = models;

let token;
let invalidToken = 'invalidToken';

Users.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

Events.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

Centers.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true
});

describe('tests for application', () => {
  describe('Test case for loading application home page', () => {
    it('should load application home page', (done) => {
      request.get('/')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          //   expect(res.body).equal({
          //     message: 'Event Manager Server now Running',
          //   });
          if (err) done(err);
          done();
        });
    });
  });

  describe('test for invalid routes', () => {
    it('should fail to load application home page', (done) => {
      request.get('/home')
        .set('Accept', 'application/json')
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.not.equal(null);
          expect(res.body).deep.equal({ error: 'page not found' });
          if (err) done(err);
          done();
        });
    });

    it('should fail to get route', (done) => {
      request.get('/api/v1')
        .set('Accept', 'application/json')
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.not.equal(null);
          expect(res.body).deep.equal({ error: 'page not found' });
          if (err) done(err);
          done();
        });
    });

    it('should fail to get invalid route', (done) => {
      request.get('/api/v1/5')
        .set('Accept', 'application/json')
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.not.equal(null);
          expect(res.body).deep.equal({ error: 'page not found' });
          if (err) done(err);
          done();
        });
    });
  });

  describe('tests for Signup processes', () => {
    describe('test for valid signup', () => {
      it('should return a success message', (done) => {
        request.post('/api/v1/users')
          .set('Accept', 'application/json')
          .send({
            fullname: 'Olayemi Lawal',
            email: 'ola@test.com',
            password: 'verygood',
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).deep.equal('You are now Signed Up');
            if (err) done(err);
            done();
          });
      });
    });

    describe('test for invalid signup', () => {
      it('should return error message when all or some fields are undefined', (done) => {
        request.post('/api/v1/users')
          .set('Accept', 'application/json')
          .send({
            // fullname is missing
            email: 'ola@test.com',
            password: 'verygood',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body).deep.equal({ message: 'All or some fields are not defined' });
            if (err) done(err);
            done();
          });
      });

      it('should return error message when all or some fields are empty', (done) => {
        request.post('/api/v1/users')
          .set('Accept', 'application/json')
          .send({
            // password is empty
            fullname: 'Olayemi Lawal',
            email: 'ola@test.com',
            password: '',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('password');
            expect(res.body.password).to.not.equal(null);
            expect(res.body).deep.equal({ password: 'Password is required' });
            if (err) done(err);
            done();
          });
      });

      it('should return error message invalid input characters are entered', (done) => {
        request.post('/api/v1/users')
          .set('Accept', 'application/json')
          .send({
            // password is empty
            fullname: 'Olayemi Lawal',
            email: 'ola#test.com',
            password: 'very good',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('email');
            expect(res.body.email).to.not.equal(null);
            expect(res.body).deep.equal({ email: 'Email is invalid' });
            if (err) done(err);
            done();
          });
      });

      it('should return error message user already exist', (done) => {
        request.post('/api/v1/users')
          .set('Accept', 'application/json')
          .send({
            fullname: 'Olayemi Lawal',
            email: 'ola@test.com',
            password: 'very good',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).deep.equal('ola@test.com already exist');
            if (err) done(err);
            done();
          });
      });
    });
  });

  describe('tests for Signin processes', () => {
    describe('test for invalid signin', () => {
      it('should return error message when all or some fields are undefined', (done) => {
        request.post('/api/v1/users/login')
          .set('Accept', 'application/json')
          .send({
            // Email is missing
            password: 'verygood',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body).deep.equal({ message: 'Email or Password is undefined' });
            if (err) done(err);
            done();
          });
      });

      it('should return error message when all or some fields are empty', (done) => {
        request.post('/api/v1/users/login')
          .set('Accept', 'application/json')
          .send({
            // password is empty
            email: 'ola@test.com',
            password: '',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('password');
            expect(res.body.password).to.not.equal(null);
            expect(res.body).deep.equal({ password: 'Password is required' });
            if (err) done(err);
            done();
          });
      });

      it('should return error message invalid input characters are entered', (done) => {
        request.post('/api/v1/users/login')
          .set('Accept', 'application/json')
          .send({
            // password is empty
            email: 'ola#test.com',
            password: 'very good',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('email');
            expect(res.body.email).to.not.equal(null);
            expect(res.body).deep.equal({ email: 'Type a valid email' });
            if (err) done(err);
            done();
          });
      });

      it('should return error message for new email', (done) => {
        request.post('/api/v1/users/login')
          .set('Accept', 'application/json')
          .send({
            email: 'absent@test.com',
            password: 'very good',
          })
          .expect(404)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).deep.equal('User not found, Please sign up if you ar a new user');
            done();
          });
      });

      it('should return error message for incorrect email or password', (done) => {
        request.post('/api/v1/users/login')
          .set('Accept', 'application/json')
          .send({
            email: 'ola@test.com',
            password: 'bad password',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).deep.equal('Invalid username or password');
            done();
          });
      });
    });

    describe('test for valid signin', () => {
      it('should return a success message', (done) => {
        request.post('/api/v1/users/login')
          .set('Accept', 'application/json')
          .send({
            email: 'olayemiadmin@gmail.com',
            password: '1234567890',
          })
          .expect(200)
          .end((err, res) => {
            token = res.body.token;
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).deep.equal('You are now logged In');
            if (err) done(err);
            done();
          });
      });
    });
  });

  describe('tests for post, update and get center processes ', () => {
    describe('test for undefined or invalid inputs', () => {
      it('should return error message when token is undefined', (done) => {
        request.get('/api/v1/centers')
          .expect(403)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body).deep.equal({ message: 'Access denied. You are not logged in' });
            if (err) done(err);
            done();
          });
      });


      it('should return error message when token is invalid', (done) => {
        request.get('/api/v1/centers')
          .set('x-access-token', invalidToken)
          .expect(401)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body).deep.equal({ message: 'Token is Invalid or Expired' });
            if (err) done(err);
            done();
          });
      });

      it('should return error message when all or some fields are undefined', (done) => {
        request.post('/api/v1/centers')
          .set('x-access-token', token)
          .send({
            // No facility and location field
            centerName: 'Five Points',
            description: 'A world class event center',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body).deep.equal({ message: 'All or Some Fields are Undefined' });
            if (err) done(err);
            done();
          });
      });

      it('should return error message when all or some fields are empty', (done) => {
        request.post('/api/v1/centers')
          .set('x-access-token', token)
          .send({
            // Empty facility and location field
            centerName: 'Five Points',
            description: 'A world class event center',
            facilities: '',
            location: '',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.not.equal(null);
            expect(res.body).deep.equal({
              facilities: 'Center should have at least one facility',
              location: 'Center should have an Address',
            });
            if (err) done(err);
            done();
          });
      });

      it('should return error message invalid input characters are entered', (done) => {
        request.post('/api/v1/centers')
          .set('x-access-token', token)
          .send({
            // Empty facility and location field
            centerName: 'Five Points #1',
            description: 'A world class event center/Hotel',
            facilities: 'Projector & Stage Lights, ^2 Sound',
            location: 'Lekki, Lagos',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.not.equal(null);
            expect(res.body).deep.equal({
              centerName: 'Center Name can only contain numbers and letters',
              description: 'description can not include symbols except comma and full stop',
              facilities: 'Facilities can not include symbols except comma which you should use to separate the faciities',
            });
            if (err) done(err);
            done();
          });
      });

      it('should create a center', (done) => {
        request.post('/api/v1/centers')
          .set('x-access-token', token)
          .send({
            centerName: 'Five Points',
            description: 'A world class event center',
            location: 'Lekki, Lagos',
            facilities: 'Projector, Stage Lights, Sound',
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body).deep.equal({
              message: 'Successfully created a center',
              data: {
                CenterName: 'Five Points',
              },
            });
            if (err) done(err);
            done();
          });
      });

      // it('should return error message for incorrect email or password', (done) => {
      //   request.post('/api/v1/users/login')
      //     .set('Accept', 'application/json')
      //     .send({
      //       email: 'ola@test.com',
      //       password: 'bad password',
      //     })
      //     .expect(400)
      //     .end((err, res) => {
      //       expect(res.body).to.have.property('message');
      //       expect(res.body.message).to.not.equal(null);
      //       expect(res.body.message).deep.equal('Invalid username or password');
      //       done();
      //     });
      // });
    });
  });
});
