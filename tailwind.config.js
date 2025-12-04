/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sopra-purple': '#6B46C1',
        'sopra-grey': '#4B5563',
        'admin-blue': '#1E40AF',
      },
    },
  },
  plugins: [],
}

