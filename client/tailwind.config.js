const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: false, //change in Production
    content: [
      './components/**/*.tsx',
      './pages/**/*.tsx',
      './components/**/*.js',
      './pages/**/*.js',
    ],
  },
  theme: {
    fontFamily: {},
    extend: {
      colors: {
        primary: colors.blue,
        secondary: colors.indigo,
        neutral: colors.gray,
      },
      fontSize: {
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
        20: '20px',
        24: '24px',
        30: '30px',
        36: '36px',
        48: '48px',
        60: '60px',
        80: '80px',
      },
      spacing: {
        36: '9rem',
        14: '3.5rem',
        70: '17.5rem',
        160: '40rem',
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '24%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333333%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%'
      }
    },
  },
  variants: {
    borderStyle: ['responsive', 'hover', 'focus'],
    transitionProperty: [
      'responsive',
      'hover',
      'focus',
      'motion-safe',
      'motion-reduce',
    ],
    display: ['responsive', 'group-hover']
  },
  plugins: [],
};
