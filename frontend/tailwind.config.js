/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./src/**/*.{js,jsx,}",  "./index.html",],
  theme: {
    //  screens: {
    //   sm: '480px',
    //   md: '768px',
    //   lg: '976px',
    //   xl: '1440px',
    // },
    extend: {
      colors: {
        mdGray: '#616161',
        fontGray: '#7b8a8b',
        blackGray: '#121212',
        textColor: '#757575',
        btnGray: '#3c4c5d',
        btnGrayHover: '#33414f',
        btnGreen: '#18bc9c',
        white: '#fff',
        black: '#000',
        primary: '#3c4c5d'
      }
    },
  },
  plugins: [],
}
