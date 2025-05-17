/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#abc7ff',
          shade: '#82acff',
          tint: '#d4e2ff',
          rgb: '171, 199, 255',
          container: '#00458f',
          on: '#002f65',
          onContainer: '#d7e3ff',
          inverse: '#005cbb',
        },
        secondary: {
          DEFAULT: '#bec6dc',
          container: '#3e4759',
          on: '#283041',
          onContainer: '#dae2f9',
        },
        surface: {
          DEFAULT: '#1a1b1f',
          0: '#141518',
          1: '#21242a',
          2: '#262931',
          3: '#2a2e38',
          4: '#2b303a',
          5: '#2e333e',
          variant: '#44474e',
          on: '#e3e2e6',
          onVariant: '#c4c6d0',
          inverse: '#e3e2e6',
          inverseOn: '#2f3033',
        },
        outline: {
          DEFAULT: '#8e9099',
          variant: '#44474e',
        },
        code: '#d3bbff',
        red: '#ffb4aa',
        green: '#55e16b',
        orange: '#ffb874',
      },
      boxShadow: {
        'navigation': '0px 0px 8px 0px rgba(171, 199, 255, 0.53)',
        'javascript': '0 0 4px 2px rgba(250, 197, 43, 0.6), 0 0 8px 6px rgba(250, 197, 43, 0.4), 0 0 16px 12px rgba(250, 197, 43, 0.2), 0 0 24px 20px rgba(250, 197, 43, 0.1)',
        'typescript': '0 0 4px 2px rgba(49, 120, 198, 0.6),0 0 8px 6px rgba(49, 120, 198, 0.4),0 0 16px 12px rgba(49, 120, 198, 0.2),0 0 24px 20px rgba(49, 120, 198, 0.1)',
        'tailwindCSS': '0 0 4px 2px rgba(0, 166, 244, 0.6), 0 0 8px 6px rgba(0, 166, 244, 0.4), 0 0 16px 12px rgba(0, 166, 244, 0.2),0 0 24px 20px rgba(0, 166, 244, 0.1)',
        'react': '0 0 4px 2px rgba(0, 214, 253, 0.6), 0 0 8px 6px rgba(0, 214, 253, 0.4), 0 0 16px 12px rgba(0, 214, 253, 0.2), 0 0 24px 20px rgba(0, 214, 253, 0.1)',
        'vite': '0 0 4px 2px rgba(255,255, 255, 0.6), 0 0 8px 6px rgba(255,255, 255, 0.4), 0 0 16px 12px rgba(255,255, 255, 0.2), 0 0 24px 20px rgba(255,255, 255, 0.1)',
        'react-router': '0 0 4px 2px rgba(193, 15, 46, 0.6), 0 0 8px 6px rgba(193, 15, 46, 0.4), 0 0 16px 12px rgba(193, 15, 46, 0.2), 0 0 24px 20px rgba(193, 15, 46, 0.1)',
        'axios': '0 0 4px 2px rgba(103, 58, 184, 0.6), 0 0 8px 6px rgba(103, 58, 184, 0.4), 0 0 16px 12px rgba(103, 58, 184, 0.2), 0 0 24px 20px rgba(103, 58, 184, 0.1)',
        'swiper': '0 0 4px 2px rgba(117, 178, 223, 0.6), 0 0 8px 6px rgba(117, 178, 223, 0.4), 0 0 16px 12px rgba(117, 178, 223, 0.2), 0 0 24px 20px rgba(117, 178, 223, 0.1)',
        'motion': '0 0 4px 2px rgba(255, 243, 18, 0.6), 0 0 8px 6px rgba(255, 243, 18, 0.4), 0 0 16px 12px rgba(255, 243, 18, 0.2), 0 0 24px 20px rgba(255, 243, 18, 0.1)',
        'html': '0 0 4px 2px rgba(255, 92, 19, 0.6), 0 0 8px 6px rgba(255, 92, 19, 0.4), 0 0 16px 12px rgba(255, 92, 19, 0.2), 0 0 24px 20px rgba(255, 92, 19, 0.1)',
        'css': '0 0 4px 2px rgba(0, 128, 255, 0.6), 0 0 8px 6px rgba(0, 128, 255, 0.4), 0 0 16px 12px rgba(0, 128, 255, 0.2), 0 0 24px 20px rgba(0, 128, 255, 0.1)',
        'swagger': '0 0 4px 2px rgba(0, 218, 129, 0.6), 0 0 8px 6px rgba(0, 218, 129, 0.4), 0 0 16px 12px rgba(0, 218, 129, 0.2), 0 0 24px 20px rgba(0, 218, 129, 0.1)',
        'aspNet-core': '0 0 4px 2px rgba(117, 178, 223, 0.6), 0 0 8px 6px rgba(117, 178, 223, 0.4), 0 0 16px 12px rgba(117, 178, 223, 0.2), 0 0 24px 20px rgba(117, 178, 223, 0.1)',
        'net-core': '0 0 4px 2px rgba(103, 58, 184, 0.6), 0 0 8px 6px rgba(103, 58, 184, 0.4), 0 0 16px 12px rgba(103, 58, 184, 0.2), 0 0 24px 20px rgba(103, 58, 184, 0.1)',
        'cSharp': '0 0 4px 2px rgba(147, 84, 255, 0.6), 0 0 8px 6px rgba(147, 84, 255, 0.4), 0 0 16px 12px rgba(147, 84, 255, 0.2), 0 0 24px 20px rgba(147, 84, 255, 0.1)',
        'redis': '0 0 4px 2px rgba(235, 23, 23, 0.6), 0 0 8px 6px rgba(235, 23, 23, 0.4), 0 0 16px 12px rgba(235, 23, 23, 0.2), 0 0 24px 20px rgba(235, 23, 23, 0.1)',
        'serilog': '0 0 4px 2px rgba(255, 51, 51, 0.6), 0 0 8px 6px rgba(255, 51, 51, 0.4), 0 0 16px 12px rgba(255, 51, 51, 0.2), 0 0 24px 20px rgba(255, 51, 51, 0.1)',
        'oAuth2': '0 0 4px 2px rgba(171, 199, 255, 0.6), 0 0 8px 6px rgba(171, 199, 255, 0.4), 0 0 16px 12px rgba(171, 199, 255, 0.2), 0 0 24px 20px rgba(171, 199, 255, 0.1)',
        'jwt': '0 0 4px 2px rgba(90, 69, 255, 0.6), 0 0 8px 6px rgba(90, 69, 255, 0.4), 0 0 16px 12px rgba(90, 69, 255, 0.2), 0 0 24px 20px rgba(90, 69, 255, 0.1)',
        'xunit': '0 0 4px 2px rgba(255, 255, 255, 0.6), 0 0 8px 6px rgba(255, 255, 255, 0.4), 0 0 16px 12px rgba(255, 255, 255, 0.2), 0 0 24px 20px rgba(255, 255, 255, 0.1)',
        'sql-server': '0 0 4px 2px rgba(229, 69, 11, 0.6), 0 0 8px 6px rgba(229, 69, 11, 0.4), 0 0 16px 12px rgba(229, 69, 11, 0.2), 0 0 24px 20px rgba(229, 69, 11, 0.1)',
      }, 
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem"
        },
      }
    },
  },
  plugins: [],
}

