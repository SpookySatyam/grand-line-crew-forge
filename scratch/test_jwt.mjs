import { Client, Account, ID } from 'node-appwrite';

const endpoint = 'https://fra.cloud.appwrite.io/v1';
const projectId = '6ababea6002376bc0494';

async function test() {
  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId);
  
  const account = new Account(client);
  
  try {
    // 1. Create a user
    const email = `test_${Date.now()}@example.com`;
    const password = 'password123';
    await account.create(ID.unique(), email, password, 'Test User');
    console.log('User created:', email);

    // 2. Login
    await account.createEmailPasswordSession(email, password);
    console.log('Session created');

    // 3. Create JWT
    const jwtResponse = await account.createJWT();
    console.log('JWT created:', jwtResponse.jwt.substring(0, 20) + '...');

    // 4. Verify JWT on the local server
    const serverUrl = 'http://localhost:5000/api/dashboard/stats';
    const res = await fetch(serverUrl, {
      headers: {
        'Authorization': `Bearer ${jwtResponse.jwt}`
      }
    });

    const data = await res.json();
    console.log('Server response:', res.status, data);

  } catch (error) {
    console.error('Error:', error);
  }
}

test();
