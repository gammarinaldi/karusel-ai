const fs = require('fs');
const path = require('path');

function copyFile(src, dest) {
  // Ensure destination directory exists
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
  console.log(`Copied ${src} to ${dest}`);
}

try {
  const fontSrc = path.join(__dirname, '..', 'node_modules', '@fontsource', 'inter', 'files', 'inter-latin-700-normal.woff');
  const fontDest = path.join(__dirname, '..', 'public', 'fonts', 'inter-bold.woff');
  
  const wasmSrc = path.join(__dirname, '..', 'node_modules', '@resvg', 'resvg-wasm', 'index_bg.wasm');
  const wasmDest = path.join(__dirname, '..', 'public', 'resvg.wasm');

  copyFile(fontSrc, fontDest);
  copyFile(wasmSrc, wasmDest);
  console.log('Prebuild script finished successfully!');
} catch (error) {
  console.error('Prebuild script failed:', error);
  process.exit(1);
}
