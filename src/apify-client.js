import { ApifyClient } from 'apify-client';
import 'dotenv/config';

const token = process.env.APIFY_API_TOKEN;

if (!token) {
  throw new Error('APIFY_API_TOKEN is not set in environment variables');
}

export const client = new ApifyClient({ token });

export async function getAccountInfo() {
  const user = await client.user('me').get();
  return user;
}
