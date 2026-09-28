import fs from 'fs';
import path from 'path';
import https from 'https';

const assetsDir = path.join(process.cwd(), 'public', 'assets', 'one-piece');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const files = [
  '01-franky-primary.jpg',
  '02-brook.jpg',
  '03-robin.jpg',
  '04-franky-secondary.jpg',
  '05-sanji.jpg',
  '06-chopper.jpg',
  '07-usopp.jpg',
  '08-zoro.jpg',
  '09-nami.jpg',
  '10-straw-hat-crew-primary.jpg',
  '11-straw-hat-crew-secondary.jpg',
  '12-cinematic-background.jpg'
];

async function downloadPlaceholder(filename) {
  const text = encodeURIComponent(filename.replace('.jpg', '').replace(/-/g, ' '));
  // Requesting JPEG from placehold.co
  const url = `https://placehold.co/800x600/2d2217/cda873/jpeg?text=${text}`;
  const filePath = path.join(assetsDir, filename);

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
        return;
      }
      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded placeholder for ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the file async.
      reject(err);
    });
  });
}

async function generateAll() {
  for (const file of files) {
    try {
      await downloadPlaceholder(file);
    } catch (err) {
      console.error(err.message);
    }
  }
  console.log('All placeholders downloaded.');
}

generateAll();
