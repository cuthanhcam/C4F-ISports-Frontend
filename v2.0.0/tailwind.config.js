/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        subheading: ["Manrope", "sans-serif"],
        body: ["Urbanist", "sans-serif"]
      },
      colors: {
        primary: {
          DEFAULT: "#abc7ff",
          shade: "#82acff",
          tint: "#d4e2ff",
          rgb: "171, 199, 255",
          container: "#00458f",
          on: "#002f65",
          onContainer: "#d7e3ff",
          inverse: "#005cbb",
        },
        secondary: {
          DEFAULT: "#bec6dc",
          container: "#3e4759",
          on: "#283041",
          onContainer: "#dae2f9",
        },
        surface: {
          DEFAULT: "#1a1b1f",
          0: "#141518",
          1: "#21242a",
          2: "#262931",
          3: "#2a2e38",
          4: "#2b303a",
          5: "#2e333e",
          variant: "#44474e",
          on: "#e3e2e6",
          onVariant: "#c4c6d0",
          inverse: "#e3e2e6",
          inverseOn: "#2f3033",
        },
        outline: {
          DEFAULT: "#8e9099",
          variant: "#44474e",
        },
        code: "#d3bbff",
        red: "#ffb4aa",
        green: "#55e16b",
        orange: "#ffb874",
      },
      boxShadow: {
        navigation: "0px 0px 8px 0px rgba(171, 199, 255, 0.53)",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  plugins: [],
};
