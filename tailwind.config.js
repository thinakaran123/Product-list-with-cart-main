/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      redhat: ["Red Hat Text, sans-serif"],
    },
    screens: {
      screen1: "400px",
      screen2: "500px",
      screen3: "550px",
      screen4: "800px",
      screen5: "900px",
      screen6: "1100px",
    },
    extend: {
      colors: {
        Red: "hsl(14, 86%, 42%)",
        Green: "hsl(159, 69%, 38%)",

        Rose50: "hsl(20, 50%, 98%)",
        Rose100: "hsl(13, 31%, 94%)",
        Rose300: "hsl(14, 25%, 72%)",
        Rose400: "hsl(7, 20%, 60%)",
        Rose500: "hsl(12, 20%, 44%)",
        Rose900: "hsl(14, 65%, 9%)",
      },
    },
  },
  plugins: [],
};
