-- Build tailwindcss --

1. npm create vite@latest . -- --template react-ts
2. - npm install -D tailwindcss@3 postcss autoprefixer.
   - npx tailwindcss init -p
3. tailwind.config.js:
   content: [
   "./index.html",
   "./src/**/*.{js,ts,jsx,tsx}",
   ],
4. index.css:
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
