import { client, getAccountInfo } from './apify-client.js';

async function main() {
  console.log('Connecting to Apify API...');

  const user = await getAccountInfo();
  console.log('Connected successfully!');
  console.log(`Account: ${user.username} (${user.email})`);
  console.log(`Plan: ${user.plan?.id ?? 'N/A'}`);

  return client;
}

main().catch(console.error);
