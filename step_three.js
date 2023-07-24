const fs = require('fs').promises;
const process = require('process');
const axios = require('axios');

async function handleOutput(text, out) {
  if (out) {
    try {
      await fs.writeFile(out, text, 'utf8');
    } catch (err) {
      console.error(`Couldn't write ${out}: ${err}`);
      process.exit(1);
    }
  } else {
    console.log(text);
  }
}

async function cat(path, out) {
  try {
    const data = await fs.readFile(path, 'utf8');
    await handleOutput(data, out);
  } catch (err) {
    console.error(`Error reading ${path}: ${err}`);
    process.exit(1);
  }
}

async function webCat(url, out) {
  try {
    const resp = await axios.get(url);
    await handleOutput(resp.data, out);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

async function main() {
  let path;
  let out;

  if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
  } else {
    path = process.argv[2];
  }

  if (path && path.slice(0, 4) === 'http') {
    await webCat(path, out);
  } else {
    await cat(path, out);
  }
}

main();
