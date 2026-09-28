import request from 'supertest';
import app from '../src/app.js';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Recruit API (Ownership Isolation)', () => {
  let user1Cookie, user2Cookie;

  beforeEach(async () => {
    const res1 = await request(app).post('/api/auth/signup').send({
      name: 'User One', email: 'user1@test.com', password: 'password123',
    });
    user1Cookie = res1.headers['set-cookie'];

    const res2 = await request(app).post('/api/auth/signup').send({
      name: 'User Two', email: 'user2@test.com', password: 'password123',
    });
    user2Cookie = res2.headers['set-cookie'];
  });

  it('should only return recruits owned by the user', async () => {
    // User 1 creates a recruit
    const createRes = await request(app).post('/api/recruits').set('Cookie', user1Cookie).send({
      name: 'Usopp',
      roleKey: 'sniper',
      skills: ['Marksmanship'],
    });
    
    expect(createRes.statusCode).toEqual(201);
    
    // User 1 gets their recruits
    const getRes1 = await request(app).get('/api/recruits').set('Cookie', user1Cookie);
    expect(getRes1.body.data.length).toBe(1);
    expect(getRes1.body.data[0].name).toBe('Usopp');
    
    // User 2 gets their recruits (should be 0)
    const getRes2 = await request(app).get('/api/recruits').set('Cookie', user2Cookie);
    expect(getRes2.body.data.length).toBe(0);
  });

  it('should not allow user2 to delete user1 recruit', async () => {
    const createRes = await request(app).post('/api/recruits').set('Cookie', user1Cookie).send({
      name: 'Franky',
      roleKey: 'shipwright',
      skills: ['Engineering'],
    });
    const recruitId = createRes.body.data._id;

    const delRes = await request(app).delete(`/api/recruits/${recruitId}`).set('Cookie', user2Cookie);
    expect(delRes.statusCode).toEqual(404); // Should not find it since scoped by owner
  });
});
