const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourcePath = 'C:/Users/pc/.gemini/antigravity-ide/brain/5c7f92b7-89f8-46af-9f8c-cd2289df4d62/.user_uploaded/media_1792332960926.jpg';
const targetDir = path.resolve(__dirname, '../public/images');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function processImages() {
  if (!fs.existsSync(sourcePath)) {
    const existingJpg = path.join(targetDir, 'mayank-aggarwal.jpg');
    if (fs.existsSync(existingJpg)) {
      console.log('✓ Portrait images already present in public/images/');
      return;
    }
    console.warn('Source portrait not found at:', sourcePath);
    return;
  }
  console.log('Reading source image from:', sourcePath);
  
  // 1. Standard JPG fallback (900px wide, high quality, under 150KB)
  const jpgDest = path.join(targetDir, 'mayank-aggarwal.jpg');
  await sharp(sourcePath)
    .resize({ width: 850, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 86, progressive: true, mozjpeg: true })
    .toFile(jpgDest);
  const jpgStats = fs.statSync(jpgDest);
  console.log(`✓ Generated mayank-aggarwal.jpg: ${(jpgStats.size / 1024).toFixed(1)} KB`);

  // 2. Compressed WebP version (900px wide, under 150KB, highly optimized)
  const webpDest = path.join(targetDir, 'mayank-aggarwal.webp');
  await sharp(sourcePath)
    .resize({ width: 850, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 84, effort: 6 })
    .toFile(webpDest);
  const webpStats = fs.statSync(webpDest);
  console.log(`✓ Generated mayank-aggarwal.webp: ${(webpStats.size / 1024).toFixed(1)} KB`);

  // 3. Circular / Square avatar crop focused on face (400x400)
  const avatarDest = path.join(targetDir, 'mayank-aggarwal-avatar.webp');
  await sharp(sourcePath)
    .extract({ left: 100, top: 40, width: 580, height: 580 })
    .resize(400, 400)
    .webp({ quality: 85 })
    .toFile(avatarDest);
  console.log('✓ Generated mayank-aggarwal-avatar.webp');

  // 4. OpenGraph 1200x630 crop / canvas
  // Background matches the studio grey #eae8e5 / #ececec
  const ogDest = path.join(targetDir, 'mayank-aggarwal-og.jpg');
  const portraitForOg = await sharp(sourcePath)
    .resize({ height: 630, fit: 'contain' })
    .toBuffer();

  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: { r: 236, g: 236, b: 234 }
    }
  })
    .composite([
      {
        input: portraitForOg,
        top: 0,
        left: 350
      }
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(ogDest);
  const ogStats = fs.statSync(ogDest);
  console.log(`✓ Generated mayank-aggarwal-og.jpg (1200x630): ${(ogStats.size / 1024).toFixed(1)} KB`);
}

processImages().catch(err => {
  console.error('Error processing images:', err);
  process.exit(1);
});
