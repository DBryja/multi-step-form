/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        sidebarMobile: "url('./images/bg-sidebar-mobile.svg')",
        sidebarDesktop: "url('./images/bg-sidebar-desktop.svg')",
      },
      colors: {
        cblue: {
          200: "hsl(206, 94%, 87%)",
          300: "hsl(228, 100%, 84%)",
          600: "hsl(213, 96%, 18%)",
          700: "hsl(243, 100%, 62%)",
        },
        cred: {
          400: "hsl(354, 84%, 57%)",
        },
        cgray: {
          100: "hsl(231, 100%, 99%)",
          200: "hsl(217, 100%, 97%)",
          300: "hsl(229, 24%, 87%)",
          400: "hsl(231, 11%, 63%)",
        },
        white: "hsl(0, 0%, 100%)",
      },
    },
  },
  plugins: [],
};
