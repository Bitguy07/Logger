/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBg: '#266E73', // Custom background color
        primaryText: '#C6ECCF', // Custom text color
      },
    },
  },
  plugins: [],
}

{/* <input type="text" className='w-full rounded-full focus:outline-none text-[#9C9F9F] bg-[#C6ECCF] h-11 flex-grow flex-shrink-0 ' />   */}

