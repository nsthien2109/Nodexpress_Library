require('@babel/register')();
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const db  =  require('../src/models/index')

const app = require('../src/index');


describe('Image upload API', () => {
  let imageId;

  before((done) => {
    // Connect to the test database before running tests
    db.sequelize
      .sync({ force: true })
      .then(() => {
        console.log('Database connected');
        done();
      })
      .catch((err) => done(err));
  });

  after((done) => {
    // Disconnect from the test database after running tests
    db.sequelize.close(); 
    done();
  });

  
});