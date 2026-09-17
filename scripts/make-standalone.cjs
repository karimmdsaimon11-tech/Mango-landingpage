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
    // Using split.join avoids regex $ replacement mangling
    html = html.split(cssMatch[0]).join(`<style>\n${cssContent}\n</style>`);
  }
}

// Read JS file and inline
const jsMatch = html.match(/<script[^>]*type="module"[^>]*src="([^"]+)"[^>]*><\/script>/);
if (jsMatch) {
  const jsSrc = jsMatch[1].replace(/^\//, '');
  const jsPath = path.join(distDir, jsSrc);
  if (fs.existsSync(jsPath)) {
    let jsContent = fs.readFileSync(jsPath, 'utf8');
    // Replace custom assets path to relative ./custom-assets/
    jsContent = jsContent.replace(/\/custom-assets\//g, './custom-assets/');
    // Escape </script> inside JS so browser parser never terminates script tag prematurely
    jsContent = jsContent.replace(/<\/script/gi, '<\\/script');
    // Using split.join avoids regex $ replacement mangling
    html = html.split(jsMatch[0]).join(`<script type="module">\n${jsContent}\n</script>`);
  }
}

// Save standalone versions
fs.writeFileSync(path.join(distDir, 'offline-view.html'), html, 'utf8');
fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf8');
console.log('✅ Standalone offline-view.html and index.html generated for direct pen drive / file:// use!');
