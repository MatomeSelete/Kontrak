/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#EFAC48",
          secondary: "#46d6c0",
          accent: "#d18af7",
          neutral: "#1A1825",
          info: "#758AF5",
          success: "#53DFA2",
          warning: "#DFA107",
          error: "#DF495D",
          // "base-100":"#E0E6EB",
          base:"#F5F5F5",
        },
      },
    ],
  },
  content: ["./src/**/*.{html,js}",
  "./node_modules/flowbite/**/*.js"
],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require('flowbite/plugin')

],
}


