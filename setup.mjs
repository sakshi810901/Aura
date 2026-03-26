import https from 'https';
import fs from 'fs';
import path from 'path';

const dir = path.join('public', 'models');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const files = [
  'tiny_face_detector_model-weights_manifest.json',
  'tiny_face_detector_model-shard1'
];

files.forEach(f => {
  const file = fs.createWriteStream(path.join(dir, f));
  https.get(`https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/${f}`, function(response) {
    response.pipe(file);
    file.on('finish', () => {
      file.close();  // close() is async, call cb after close completes.
      console.log(`Downloaded ${f}`);
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(path.join(dir, f), () => {}); // Delete the file async. (But we don't check the result)
    console.error(`Error downloading ${f}: ${err.message}`);
  });
});
