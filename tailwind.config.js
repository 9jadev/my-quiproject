const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
    prefix: '',
    mode: 'jit',
    purge: {
      content: [
        './src/**/*.{html,ts,css,scss,sass,less,styl}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {
        zIndex: {
          '5': 5,
        },
        spacing : {
          max: "max-content",
          cardh: "164px",
          cardw: "273px"
        },
        inset: {
         'custom9': '9rem',
         "custom30": "30%",
         '64': '16rem',
         '1/5': '20%',
         '90': '90%',
         '80': '80%'
        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/forms'),
      require('@tailwindcss/line-clamp'),
      require('@tailwindcss/typography'),
      require('daisyui'),
    ],
};
