import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const sitemapPath = path.resolve(rootDir, 'public', 'sitemap.xml');
const keyPathOptions = [
  path.resolve(rootDir, 'service-account.json'),
  path.resolve(rootDir, 'google-indexing-credentials.json'),
  path.resolve(rootDir, 'credentials', 'service-account.json'),
];

let keyFilePath = keyPathOptions.find((p) => fs.existsSync(p));

function showSetupInstructions() {
  console.log(`
======================================================================
  GOOGLE INDEXING API - SETUP INSTRUCTIONS
======================================================================

Google Indexing API ke zariye automated indexing ke liye 1-time setup karein:

1. GOOGLE CLOUD CONSOLE OPEN KAREIN:
   👉 https://console.cloud.google.com/

2. NAYA PROJECT BANAYEIN & INDEXING API ENABLE KAREIN:
   - Ek naya project create karein (e.g., "Mayank Portfolio Indexing")
   - API Library me ja kar search karein: "Web Search Indexing API"
   - "ENABLE" par click karein.

3. SERVICE ACCOUNT CREATE KAREIN:
   - "IAM & Admin" -> "Service Accounts" par jayein
   - "Create Service Account" par click karein (Name: indexing-bot)
   - Role me "Owner" ya "Editor" select karein aur Finish karein.

4. PRIVATE KEY (JSON) DOWNLOAD KAREIN:
   - Banaye gaye Service Account par click karein -> "Keys" tab -> "Add Key" -> "Create new key"
   - Key type: "JSON" select karein aur download karein.
   - Us downloaded JSON file ko is project ke root folder me rename karke paste karein:
     📁 ${path.resolve(rootDir, 'service-account.json')}

5. GOOGLE SEARCH CONSOLE ME PERMISSION DEIN:
   - Service account ka email copy karein (e.g., indexing-bot@your-project.iam.gserviceaccount.com)
   - Google Search Console (https://search.google.com/search-console) open karein
   - Settings -> Users and Permissions -> "Add User"
   - Service account email paste karein aur Permission me "Owner" select karein.

6. SCRIPT RUN KAREIN:
   👉 node scripts/submit-google-indexing.js
======================================================================
`);
}

if (!fs.existsSync(sitemapPath)) {
  console.error('❌ Error: public/sitemap.xml not found.');
  process.exit(1);
}

if (!keyFilePath) {
  console.warn('⚠️  service-account.json file not found in project root.');
  showSetupInstructions();
  process.exit(0);
}

// Read Service Account Credentials
let credentials;
try {
  credentials = JSON.parse(fs.readFileSync(keyFilePath, 'utf8'));
} catch (err) {
  console.error('❌ Error parsing service account JSON:', err.message);
  process.exit(1);
}

const { client_email, private_key } = credentials;

if (!client_email || !private_key) {
  console.error('❌ Invalid service account file: client_email or private_key missing.');
  process.exit(1);
}

// Generate Google OAuth2 JWT Bearer Token using built-in node:crypto
function createJwtToken() {
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);
  const claimSet = {
    iss: client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const encodeBase64Url = (obj) =>
    Buffer.from(JSON.stringify(obj))
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

  const unsignedToken = `${encodeBase64Url(header)}.${encodeBase64Url(claimSet)}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsignedToken);
  signer.end();

  const signature = signer
    .sign(private_key, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${unsignedToken}.${signature}`;
}

async function getAccessToken() {
  const jwt = createJwtToken();
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to fetch Google OAuth token (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  return data.access_token;
}

// Extract URLs from sitemap.xml
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const urls = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

console.log(`\n🔍 Found ${urls.length} URLs in public/sitemap.xml`);

async function submitUrlToGoogle(url, accessToken) {
  const endpoint = 'https://indexing.googleapis.com/v3/urlNotifications:publish';
  const body = JSON.stringify({
    url,
    type: 'URL_UPDATED',
  });

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body,
  });

  const data = await res.json();
  return { status: res.status, ok: res.ok, data };
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log(`🔑 Generating Google Access Token for ${client_email}...`);
  let accessToken;
  try {
    accessToken = await getAccessToken();
    console.log('✓ Google OAuth2 Access Token successfully generated.\n');
  } catch (err) {
    console.error('❌ Authentication failed:', err.message);
    process.exit(1);
  }

  console.log(`🚀 Starting Google Indexing Submission for ${urls.length} URLs...`);
  console.log('------------------------------------------------------------');

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      const result = await submitUrlToGoogle(url, accessToken);
      if (result.ok) {
        successCount++;
        console.log(`[${i + 1}/${urls.length}] ✓ Submitted: ${url}`);
      } else {
        failCount++;
        console.warn(`[${i + 1}/${urls.length}] ⚠️  Failed (${result.status}): ${url}`);
        if (result.data && result.data.error) {
          console.warn(`    Reason: ${result.data.error.message}`);
        }
      }
    } catch (err) {
      failCount++;
      console.error(`[${i + 1}/${urls.length}] ❌ Error submitting ${url}:`, err.message);
    }

    // Google API rate-limit buffer: 150ms delay between requests
    await delay(150);
  }

  console.log('------------------------------------------------------------');
  console.log(`🏁 Indexing Run Complete: ${successCount} Successful, ${failCount} Failed.`);
}

main();
