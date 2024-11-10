/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        grdate: "#005B41", // Custom gradient background color
      },
      colors: {
        textColor: "#0F0F0F", // Custom text color
      },
      animation: {
        marquee: 'marquee 30s linear infinite', // Increased duration to 30 seconds
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [
    require('daisyui'), // DaisyUI plugin for UI components
  ],
  daisyui: {
    themes: false, // Disables DaisyUI's default themes if you want only custom themes
  },
}
