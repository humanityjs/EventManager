/**
  * API Endpoint Tests for database
  */
import supertest from 'supertest';
import { expect } from 'chai';
import app from '../app';

const request = supertest(app);

let token;
const invalidToken = 'invalidToken';

describe('tests for application', () => {
  // describe('Test case for loading application home page', () => {
  //   it.only('should load application home page', (done) => {
  //     request.get('/')
  //       .set('Accept', 'application/json')
  //       .expect(200)
  //       .end((err, res) => {
  //         console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', err);
  //         expect(res.body).to.have.property('message');
  //         expect(res.body.message).to.not.equal(null);
  //         if (err) {
  //           throw err;
  //         }
  //         done();
  //       })
  //       .catch(done);
  //   });
  // });

  describe('test for invalid routes', () => {
    // it('should fail to load application home page', (done) => {
    //   request.get('/home')
    //     .set('Accept', 'application/json')
    //     .expect(404)
    //     .end((err, res) => {
    //       expect(res.body).to.have.property('error');
    //       expect(res.body.error).to.not.equal(null);
    //       expect(res.body).deep.equal({ error: 'page not found' });
    //       if (err) throw err;
    //       done();
    //     });
    // });

    // it('should fail to get route', (done) => {
    //   request.get('/api/v1')
    //     .set('Accept', 'application/json')
    //     .expect(404)
    //     .end((err, res) => {
    //       expect(res.body).to.have.property('error');
    //       expect(res.body.error).to.not.equal(null);
    //       expect(res.body).deep.equal({ error: 'page not found' });
    //       if (err) throw err;
    //       done();
    //     });
    // });

    it('should fail to get invalid route', (done) => {
      request.get('/api/v1/5')
        .set('Accept', 'application/json')
        .expect(404)
        .end((err, res) => {
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body).deep.equal({ message: 'Route does not exist' });
          if (err) throw err;
          done();
        });
    });
  });

  describe('tests for Signup processes', () => {
    describe('test for valid signup', () => {
      it('should create a new user', (done) => {
        request.post('/api/v1/users')
          .set('Accept', 'application/json')
          .send({
            fullname: 'Olayemi Lawal',
            email: `ola${Math.random()}@test.com`,
            password: 'good password',
          })
          .expect(201)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).deep.equal('You are now Signed Up');
            if (err) throw err;
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
            password: 'good password',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body).deep.equal({ message: 'All or some fields are not defined' });
            if (err) throw err;
            done();
          });
      });

      // it.only('should return error message when all or some fields are empty', (done) => {
      //   request.post('/api/v1/users')
      //     .set('Accept', 'application/json')
      //     .send({
      //       // password is empty
      //       fullname: 'Olayemi Lawal',
      //       email: 'ola@test.com',
      //       password: '',
      //     })
      //     .expect(400)
      //     .end((err, res) => {
      //       expect(res.body).to.have.property('password');
      //       expect(res.body.password).to.not.equal(null);
      //       expect(res.body).deep.equal({ password: 'Password is required' });
      //       if (err) throw err;
      //       done();
      //     });
      // });

      it('should return error message invalid input characters are entered', (done) => {
        request.post('/api/v1/users')
          .set('Accept', 'application/json')
          .send({
            fullname: 'Olayemi Lawal',
            email: 'ola#test.com',
            password: 'very good',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('email');
            expect(res.body.email).to.not.equal(null);
            expect(res.body).deep.equal({ email: 'Email is invalid' });
            if (err) throw err;
            done();
          });
      });

      it('should return error message user already exist', (done) => {
        request.post('/api/v1/users')
          .set('Accept', 'application/json')
          .send({
            fullname: 'Olayemi Lawal',
            email: 'admin@test.com',
            password: '1234567890',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).deep.equal('admin@test.com already exist');
            if (err) throw err;
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
            loginPassword: 'verygood',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body).deep.equal({ message: 'Email or Password is undefined' });
            if (err) throw err;
            done();
          });
      });

      // it('should return error message when all or some fields are empty', (done) => {
      //   request.post('/api/v1/users/login')
      //     .set('Accept', 'application/json')
      //     .send({
      //       // password is empty
      //       email: 'ola@test.com',
      //       password: '',
      //     })
      //     .expect(400)
      //     .end((err, res) => {
      //       expect(res.body).to.have.property('password');
      //       expect(res.body.password).to.not.equal(null);
      //       expect(res.body).deep.equal({ password: 'Password is required' });
      //       if (err) throw err;
      //       done();
      //     });
      // });

      it('should return error message invalid input characters are entered', (done) => {
        request.post('/api/v1/users/login')
          .set('Accept', 'application/json')
          .send({
            loginEmail: 'ola#test.com',
            loginPassword: 'very good',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('loginEmail');
            expect(res.body.loginEmail).to.not.equal(null);
            expect(res.body).deep.equal({ loginEmail: 'Type a valid email' });
            if (err) throw err;
            done();
          });
      });

      it('should return error message for new email', (done) => {
        request.post('/api/v1/users/login')
          .set('Accept', 'application/json')
          .send({
            loginEmail: 'absent@test.com',
            loginPassword: 'very good',
          })
          .expect(404)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).deep.equal('User not found, Please sign up if you are a new user');
            done();
          });
      });

      it('should return error message for incorrect email or password', (done) => {
        request.post('/api/v1/users/login')
          .set('Accept', 'application/json')
          .send({
            loginEmail: 'admin@test.com',
            loginPassword: 'bad password',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).deep.equal('Invalid email or password');
            done();
          });
      });
    });

    describe('test for valid signin', () => {
      it.only('should return a success message', (done) => {
        request.post('/api/v1/users/login')
          .set('Accept', 'application/json')
          .send({
            loginEmail: 'admin@test.com',
            loginPassword: '1234567890',
          })
          .expect(200)
          .end((err, res) => {
            token = res.body.token;
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).equal('You are now logged In');
            if (err) throw err;
            done();
          });
      });
    });
  });

  describe('tests for post, update and get center processes ', () => {
    describe('test for undefined or invalid inputs', () => {
      // it.only('should return error message when token is undefined', (done) => {
      //   request.get('/api/v1/centers')
      //     .expect(403)
      //     .end((err, res) => {
      //       expect(res.body).to.have.property('message');
      //       expect(res.body.message).to.not.equal(null);
      //       expect(res.body).deep.equal({ message: 'Access denied. You are not logged in' });
      //       if (err) throw err;
      //       done();
      //     });
      // });


      // it.only('should return error message when token is invalid', (done) => {
      //   request.get('/api/v1/centers')
      //     .set('x-access-token', invalidToken)
      //     .expect(401)
      //     .end((err, res) => {
      //       expect(res.body).to.have.property('message');
      //       expect(res.body.message).to.not.equal(null);
      //       expect(res.body).deep.equal({ message: 'Token is Invalid or Expired' });
      //       if (err) throw err;
      //       done();
      //     });
      // });

      it('should return error when token is undefined', (done) => {
        request.post('/api/v1/centers')
          .send({
            centerName: 'Five Points',
            description: 'A world class event center',
          })
          .expect(403)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body).deep.equal({ message: 'Access denied. You are not logged in' });
            if (err) throw err;
            done();
          });
      });

      it('should return error when token is invalid', (done) => {
        request.post('/api/v1/centers')
          .set('x-access-token', invalidToken)
          .send({
            centerName: 'Five Points',
            description: 'A world class event center',
          })
          .expect(401)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body).deep.equal({ message: 'Token is Invalid or Expired' });
            if (err) throw err;
            done();
          });
      });

      // it('should return error when user is not admin', (done) => {
      //   request.post('/api/v1/centers')
      //     .set('x-access-token', invalidToken)
      //     .send({
      //       centerName: 'Five Points',
      //       description: 'A world class event center',
      //     })
      //     .expect(401)
      //     .end((err, res) => {
      //       expect(res.body).to.have.property('message');
      //       expect(res.body.message).to.not.equal(null);
      //       expect(res.body).deep.equal({ message: 'Token is Invalid or Expired' });
      //       if (err) throw err;
      //       done();
      //     });
      // });


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
            if (err) throw err;
            done();
          });
      });

      it('should return success message when center is created', (done) => {
        request.post('/api/v1/centers')
          .set('x-access-token', token)
          .send({
            centerName: 'Five Points',
            description: 'A world class event center',
            facilities: 'Stage light',
            location: 'Ikeja',
            capacity: '500',
            imageUrl: 'https://wwww.image.com/centerImage',
          })
          .expect(201)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body).to.have.property('center');
            expect(res.body.message).to.not.equal(null);
            expect(res.body.message).deep.equal('Successfully created a center');
            if (err) throw err;
            done();
          });
      });

      it.only('should return error message when center already exist', (done) => {
        request.post('/api/v1/centers')
          .set('x-access-token', token)
          .send({
            centerName: 'Five Points',
            description: 'A world class event center',
            facilities: 'Stage light',
            location: 'Ikeja',
            capacity: '500',
            imageUrl: 'https://wwww.image.com/centerImage',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.not.equal(null);
            expect(res.body).deep.equal({ message: 'Five Points already exist' });
            if (err) throw err;
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
            capacity: '500',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.not.equal(null);
            expect(res.body).deep.equal({
              facilities: 'Center should have at least one facility',
              location: 'Center should have an Address',
            });
            if (err) throw err;
            done();
          });
      });

      it('should return error message invalid input characters are entered', (done) => {
        request.post('/api/v1/centers')
          .set('x-access-token', token)
          .send({
            // Invalid characters
            centerName: 'Five Points #1',
            description: 'A world class event center/Hotel',
            facilities: 'Projector & Stage Lights, ^2 Sound',
            location: 'Lekki, Lagos',
            capacity: '500',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body).to.not.equal(null);
            expect(res.body).deep.equal({
              centerName: 'Center Name can only contain numbers and letters',
              description: 'description can not include symbols except comma and full stop',
              facilities: 'Facilities can not include symbols except comma which you should use to separate the faciities',
            });
            done();
          });
      });
      
      it('should return error message invalid input characters are entered', (done) => {
        request.put('/api/v1/center/a')
          .set('x-access-token', token)
          .send({
            centerName: 'Five Points #1',
            description: 'A world class event center/Hotel',
            facilities: 'Projector & Stage Lights, ^2 Sound',
            location: 'Lekki, Lagos',
            capacity: '500',
          })
          .expect(404)
          .end((err, res) => {
            expect(res.body).to.not.equal(null);
            expect(res.body).deep.equal({message: 'Center not Found' });
            if (err) throw err;
            done();
          });
      });
    });
  });
});
