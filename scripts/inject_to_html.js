const fs = require('fs');
const vm = require('vm');
const { findVarBoundaries } = require('./find_boundaries.js');

console.log('Reading index.html...');
let html = fs.readFileSync('index.html', 'utf8');

// Backup original
fs.writeFileSync('index.html.bak', html, 'utf8');
console.log('Created backup index.html.bak');

// Load datasets
const topics = JSON.parse(fs.readFileSync('./scripts/final_speaking.json', 'utf8'));
const listening = JSON.parse(fs.readFileSync('./scripts/final_listening.json', 'utf8'));
const reading = JSON.parse(fs.readFileSync('./scripts/final_reading.json', 'utf8'));
const vocab = JSON.parse(fs.readFileSync('./scripts/final_vocab.json', 'utf8'));

console.log('Loaded datasets to inject:');
console.log('- Speaking topics:', topics.length);
console.log('- Listening items:', listening.length);
console.log('- Reading items:', reading.length);
console.log('- Vocab items:', vocab.length);

// Replacement 1: VOCAB_DATA (from bottom to top so indices don't shift)
const bVocab = findVarBoundaries(html, 'VOCAB_DATA');
if (!bVocab) throw new Error('VOCAB_DATA not found');
console.log('Replacing VOCAB_DATA at', bVocab.start, bVocab.end);
html = html.substring(0, bVocab.start) + 'var VOCAB_DATA = ' + JSON.stringify(vocab, null, 2) + ';' + html.substring(bVocab.end);

// Replacement 2: READING_DATA
const bRead = findVarBoundaries(html, 'READING_DATA');
if (!bRead) throw new Error('READING_DATA not found');
console.log('Replacing READING_DATA at', bRead.start, bRead.end);
html = html.substring(0, bRead.start) + 'var READING_DATA = ' + JSON.stringify(reading, null, 2) + ';' + html.substring(bRead.end);

// Replacement 3: LISTENING_DATA
const bLis = findVarBoundaries(html, 'LISTENING_DATA');
if (!bLis) throw new Error('LISTENING_DATA not found');
console.log('Replacing LISTENING_DATA at', bLis.start, bLis.end);
html = html.substring(0, bLis.start) + 'var LISTENING_DATA = ' + JSON.stringify(listening, null, 2) + ';' + html.substring(bLis.end);

// Replacement 4: TOPICS
const bTop = findVarBoundaries(html, 'TOPICS');
if (!bTop) throw new Error('TOPICS not found');
console.log('Replacing TOPICS at', bTop.start, bTop.end);
html = html.substring(0, bTop.start) + 'var TOPICS = ' + JSON.stringify(topics, null, 2) + ';' + html.substring(bTop.end);

// Save updated index.html
fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully wrote updated index.html! New size:', html.length, 'bytes');

// Validating the new file
console.log('Validating injected JavaScript variables...');
const sandbox = {};
// Extract script tag content
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) throw new Error('Script tag not found');

// Test that the variables can be parsed without syntax error
const testCode = `
var INTRO_AUDIO = "";
var INTRO_TEXT = "Speak fast and clear.";
` + html.substring(html.indexOf('var TOPICS = '), html.indexOf('var VOCAB_LEARNED = '));

try {
  vm.runInNewContext(testCode, sandbox);
  console.log('Validation success:');
  console.log('- sandbox.TOPICS count:', sandbox.TOPICS.length);
  console.log('- sandbox.LISTENING_DATA count:', sandbox.LISTENING_DATA.length);
  console.log('- sandbox.READING_DATA count:', sandbox.READING_DATA.length);
  console.log('- sandbox.VOCAB_DATA count:', sandbox.VOCAB_DATA.length);
} catch (err) {
  console.error('Validation ERROR:', err.message);
  process.exit(1);
}
