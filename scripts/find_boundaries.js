const fs = require('fs');

function findVarBoundaries(html, varName) {
  const startRegex = new RegExp('(var\\s+' + varName + '\\s*=\\s*\\[)');
  const m = html.match(startRegex);
  if (!m) return null;
  const startIdx = m.index;
  let depth = 0;
  let inStr = false;
  let strChar = '';
  let endIdx = -1;
  for (let i = startIdx + m[0].length - 1; i < html.length; i++) {
    const ch = html[i];
    const prev = html[i-1];
    if (inStr) {
      if (ch === strChar && prev !== '\\') inStr = false;
    } else {
      if (ch === '"' || ch === '\'') {
        inStr = true;
        strChar = ch;
      } else if (ch === '[') {
        depth++;
      } else if (ch === ']') {
        depth--;
        if (depth === 0) {
          if (html[i+1] === ';') endIdx = i + 2;
          else endIdx = i + 1;
          break;
        }
      }
    }
  }
  return { start: startIdx, end: endIdx };
}

module.exports = { findVarBoundaries };
