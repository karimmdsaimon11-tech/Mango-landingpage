const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.log('No dist/index.html found to post-process.');
  process.exit(0);
}

let html = fs.readFileSync(indexPath, 'utf8');

// Read CSS file and inline
const cssMatch = html.match(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/);
if (cssMatch) {
  const cssHref = cssMatch[1].replace(/^\//, '');
  const cssPath = path.join(distDir, cssHref);
  if (fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    html = html.replace(cssMatch[0], `<style>\n${cssContent}\n</style>`);
  }
}

// Read JS file and inline
const jsMatch = html.match(/<script[^>]*type="module"[^>]*src="([^"]+)"[^>]*><\/script>/);
if (jsMatch) {
  const jsSrc = jsMatch[1].replace(/^\//, '');
  const jsPath = path.join(distDir, jsSrc);
  if (fs.existsSync(jsPath)) {
    let jsContent = fs.readFileSync(jsPath, 'utf8');
    jsContent = jsContent.replace(/\/custom-assets\//g, './custom-assets/');
    html = html.replace(jsMatch[0], `<script type="module">\n${jsContent}\n</script>`);
  }
}

// Save standalone versions
fs.writeFileSync(path.join(distDir, 'offline-view.html'), html, 'utf8');
fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf8');
console.log('✅ Standalone offline-view.html and index.html generated for direct pen drive / file:// use!');
