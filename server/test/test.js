/**
  * API Endpoint Tests for database
  */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import models from '../models';

const should = chai.should();
chai.use(chaiHttp);
const { Users, Events, Centers } = models;
const wrongToken = 'wrongAccessToken';
let pageToken1;

Users.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true,
});

Events.destroy({
  cascade: true,
  truncate: true,
  restartIdentity: true,
});


describe('All test cases for application', () => {
  describe('sign up', () => {
    it('should be able to create a new user', (done) => {
      const user = {
        fullname: 'Hyginus Chinwoke',
        email: 'chyke@gmail.com',
        password: 'ilovecoding',
      };
      chai.request(app)
        .post('api/v1/users')
        .send(user)
        .end((err, res) => {
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
