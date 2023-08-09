const config = require('./tailwind.config-base');
const theme = require('./src/theme');
const resolveConfig = require('tailwindcss/resolveConfig');

config.theme = undefined;
const finalConfig = resolveConfig({ ...config, theme });
/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = finalConfig;
