import request from 'supertest';
import app from '../src/app.js';
import { describe, it, expect, beforeEach } from 'vitest';

describe('Crew API (Formation)', () => {
  let userCookie;

  beforeEach(async () => {
    const res = await request(app).post('/api/auth/signup').send({
      name: 'Captain', email: 'captain@test.com', password: 'password123',
    });
    userCookie = res.headers['set-cookie'];
  });

  it('should form crews correctly based on team size', async () => {
    // Create 4 recruits
    const recruits = [
      { name: 'R1', roleKey: 'captain', skills: ['Leadership'] },
      { name: 'R2', roleKey: 'navigator', skills: ['Navigation'] },
      { name: 'R3', roleKey: 'sniper', skills: ['Marksmanship'] },
      { name: 'R4', roleKey: 'chef', skills: ['Cooking'] },
    ];

    for (const r of recruits) {
      await request(app).post('/api/recruits').set('Cookie', userCookie).send(r);
    }

    const formRes = await request(app).post('/api/crews/form').set('Cookie', userCookie).send({
      teamSize: 2
    });

    expect(formRes.statusCode).toEqual(201);
    expect(formRes.body.success).toBe(true);
    expect(formRes.body.data.length).toBe(2); // 4 / 2 = 2 crews
    expect(formRes.body.data[0].members.length).toBe(2);
    expect(formRes.body.data[1].members.length).toBe(2);
  });
});
