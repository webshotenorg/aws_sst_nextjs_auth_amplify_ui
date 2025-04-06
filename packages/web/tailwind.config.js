/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@aws-amplify/ui-react/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-animate'),
    // 他のプラグインがあればここに追加
  ],
};
