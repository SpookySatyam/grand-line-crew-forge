import request from 'supertest';
import app from '../src/app.js';
import { describe, it, expect } from 'vitest';
import { User } from '../src/models/User.js';

describe('Auth API', () => {
  it('should sign up a new user', async () => {
    const res = await request(app).post('/api/auth/signup').send({
      name: 'Luffy',
      email: 'luffy@pirates.com',
      password: 'password123',
    });
    
    if (res.statusCode !== 201) {
      console.log('Signup error:', res.body);
    }
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user.name).toBe('Luffy');
    expect(res.headers['set-cookie']).toBeDefined(); // JWT token
  });

  it('should not sign up with duplicate email', async () => {
    await User.create({ name: 'Zoro', email: 'zoro@pirates.com', passwordHash: 'hash' });
    const res = await request(app).post('/api/auth/signup').send({
      name: 'Zoro2',
      email: 'zoro@pirates.com',
      password: 'password123',
    });
    expect(res.statusCode).toEqual(400);
  });

  it('should login an existing user', async () => {
    await request(app).post('/api/auth/signup').send({
      name: 'Sanji',
      email: 'sanji@pirates.com',
      password: 'password123',
    });

    const res = await request(app).post('/api/auth/login').send({
      email: 'sanji@pirates.com',
      password: 'password123',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('should get current user /me', async () => {
    const signupRes = await request(app).post('/api/auth/signup').send({
      name: 'Nami',
      email: 'nami@pirates.com',
      password: 'password123',
    });
    const cookie = signupRes.headers['set-cookie'];

    const res = await request(app).get('/api/auth/me').set('Cookie', cookie);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.user.name).toBe('Nami');
  });
});
