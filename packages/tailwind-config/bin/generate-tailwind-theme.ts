#!/usr/bin/env node

const fs = require('fs');
const prettier = require('prettier');
const resolveConfig = require('tailwindcss/resolveConfig');
const path = require('path');
const tailwindConfig = require('../tailwind.config-base.js');

const { theme } = resolveConfig(tailwindConfig);
const configStr = JSON.stringify(theme);
const js = `
const config  = ${configStr}

module.exports = config;
`;

try {
  // write the file to src/theme.js after
  // having prettier format the string for us
  fs.writeFileSync(
    path.resolve(process.cwd(), 'src/theme.js'),
    prettier.format(js, { parser: 'babel' }),
    'utf-8',
  );
} catch (err) {
  // uh-oh, something happened here!
  console.log(err);
}
