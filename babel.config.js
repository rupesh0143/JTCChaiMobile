module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@babel/plugin-transform-export-namespace-from', // 🛠️ Adds support for Zod v4 syntax
    'react-native-reanimated/plugin',               // ⚠️ CRITICAL: Must always be listed LAST
  ],
};