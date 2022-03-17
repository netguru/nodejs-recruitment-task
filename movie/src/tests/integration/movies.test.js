const jwt = require("jsonwebtoken");
const request = require('supertest');
const app = require('../../server');
const Movie = require('../../models').Movie;
const MovieCreateTrack = require('../../models').MovieCreateTrack;

describe('Movie Endpoint', () => {
    afterEach(async () => { 
        await Movie.destroy({
            where: {},
            truncate: true
        })
        await MovieCreateTrack.destroy({
            where: {},
            truncate: true
        })
    });
    describe('Create Movie /post', () => {
      let token; 
      let title; 
  
      const exec = () => {
        return request(app)
          .post('/movies')
          .set('Authorization', 'Bearer ' + token)
          .send({ title });
      }
    
      beforeEach(() => {
        let user = {
          id: 1,
          name: 'Test'
        }
        token =  jwt.sign(
          {
            userId: user.id,
            name: user.name,
            role: 'basic',
          },
          process.env.JWT_SECRET,
          {
            issuer: "https://www.netguru.com/",
            subject: `${user.id}`,
            expiresIn: 30 * 60,
          }
        );
      });

      it('should return 401 if user is not logged in', async () => {
        token = ''; 
  
        const res = await exec();
  
        expect(res.status).toBe(401);
      });

  
      it('should return 400 if title is not provided', async () => {
        title = ''; 
        
        const res = await exec();
  
        expect(res.status).toBe(400);
      });
  
      it('should create a new movie with valid data', async () => {
        title = 'Test'
        const res = await exec();
      
        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty('title', 'Test');
      });

      it('should return 400 as basic user cannot create more than 5 movie a month', async () => {
        title = 'Test'
        const res = await exec();
        const res2 = await exec();
        const res3 = await exec();
        const res4 = await exec();
        const res5 = await exec();
        const res6 = await exec();
      
        expect(res6.status).toEqual(400);
      });
    });

    describe('Fetch Movie /get', () => {
      let token; 
      let title; 
  
      const exec = () => {
        return request(app)
          .post('/movies')
          .set('Authorization', 'Bearer ' + token)
          .send({ title });
      }

      const fetch = () => {
        return request(app)
          .get('/movies')
          .set('Authorization', 'Bearer ' + token)
          .send({ title });
      }
    
      beforeEach(() => {
        let user = {
          id: 1,
          name: 'Test'
        }
        token =  jwt.sign(
          {
            userId: user.id,
            name: user.name,
            role: 'basic',
          },
          process.env.JWT_SECRET,
          {
            issuer: "https://www.netguru.com/",
            subject: `${user.id}`,
            expiresIn: 30 * 60,
          }
        );
      });

      it('should return all movie of a user', async () => {
        title = 'Test'
        await exec();
  
        const res = await fetch();;
        
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(res.body.some(m => m.title === 'Test')).toBeTruthy();
      });
    });
})
