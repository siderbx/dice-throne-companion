const fs = require('fs');
const path = require('path');

const htmlContent = fs.readFileSync(path.join(__dirname, '../Dice Throne Companion - Hi-Fi.dc.html'), 'utf-8');

// Find all data arrays based on variable name
const variablesToExtract = [
  'RULES_DATA',
  'STATUS_DEFS',
  'PERK_DEFS',
  'HERO_LIST',
  'CRAWL_PHASES',
  'BOSS_PHASES'
];

let constantsFile = '';

for (const varName of variablesToExtract) {
  // Try to find var, let, or const followed by the variable name
  const regex = new RegExp(`(?:const|let|var)?\\s*${varName}\\s*=\\s*(\\[[\\s\\S]*?\\])\\s*;`, 'm');
  const match = htmlContent.match(regex);
  if (match) {
    constantsFile += `export const ${varName} = ${match[1]};\n\n`;
  } else {
    console.log(`Could not find ${varName}`);
    // Try alternate regex without ending semicolon
    const altRegex = new RegExp(`(?:const|let|var)?\\s*${varName}\\s*=\\s*(\\[[\\s\\S]*?\\])\\s*\\n`, 'm');
    const altMatch = htmlContent.match(altRegex);
    if(altMatch) {
       constantsFile += `export const ${varName} = ${altMatch[1]};\n\n`;
    }
  }
}

if (constantsFile) {
  fs.mkdirSync(path.join(__dirname, 'src/data'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'src/data/constants.ts'), constantsFile);
  console.log('Extracted to src/data/constants.ts');
} else {
  console.log('No constants found.');
}
