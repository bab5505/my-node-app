const fs = require('fs').promises;
const process = require('process');
const axios = require('axios');

async function readFile(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    return data;
  } catch (err) {
    console.error(`Error reading ${path}: ${err}`);
    process.exit(1);
  }
}

async function cat(path) {
  const data = await readFile(path);
  console.log(data);
}

async function webCat(url) {
  try {
    const resp = await axios.get(url);
    console.log(resp.data);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

async function main() {
  const input = process.argv[2];
  if (input && input.slice(0, 4) === 'http') {
    await webCat(input);
  } else {
    await cat(input);
  }
}

main();
