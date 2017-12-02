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

const { Users, Events, Centers } = models;


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
    });
  });
});
