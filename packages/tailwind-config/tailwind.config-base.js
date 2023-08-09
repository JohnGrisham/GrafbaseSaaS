const colors = require('tailwindcss/colors');
const tinycolor = require('tinycolor2');
const nearestColor = require('nearest-color');

const hexes = Object.fromEntries(
  Object.entries(colors)
    .filter(
      ([key]) =>
        !key.match(
          /black|white|current|inherit|transparent|gray|slate|stone|zinc/gi,
        )?.length,
    )
    .flatMap(([colorKey, swatch]) => {
      return Object.entries(swatch).map(([weight, hex]) => {
        return [`${colorKey}|${weight}`, hex];
      });
    }),
);

const allPrimaryColors = Object.entries(hexes)
  .filter(([key, hex]) => key.match(/500/)?.length)
  .flat()
  .filter((value) => value.match(/#/)?.length);

const primaryHex =
  allPrimaryColors[Math.floor(Math.random() * allPrimaryColors.length)];

const triad = tinycolor(primaryHex).triad();

const getCorresponding = (value) => {
  const findNearest = nearestColor.from(hexes);
  const corresponding = findNearest(value);

  const [color] = corresponding.name.split('|');

  return colors[color];
};

const palette = {
  primary: getCorresponding(triad[0].toHexString()),
  secondary: getCorresponding(triad[1].toHexString()),
  accent: getCorresponding(triad[2].toHexString()),
  danger: colors.red,
  warning: colors.yellow,
  info: colors.blue,
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['class', '[class~="dark"]'],
  theme: {
    extend: {
      colors: {
        ...colors,
        ...palette,
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /(bg|text|border)-(primary|secondary|accent|danger|warning|info)-(50|100|200|300|400|500|600|700|800|900)/,
      variants: [
        'dark',
        'hover',
        'dark:hover',
        'focus',
        'checked',
        'dark:focus',
        'active',
        'dark:active',
      ],
    },
    { pattern: /(w)-([0-9])/ },
  ],
};
