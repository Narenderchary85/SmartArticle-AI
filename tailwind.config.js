/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'postman-orange': '#FF6C37',
        },
        animation: {
          'pulse-slow': 'pulse 3s ease-in-out infinite',
          'float': 'float 6s ease-in-out infinite',
        },
      },
    },
    plugins: [
      require('@tailwindcss/line-clamp'),
      require('@tailwindcss/typography'),
    ],
  }