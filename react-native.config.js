/**
 * react-native.config.js
 * File ini memberi tahu React Native di mana menemukan aset kustom Anda (seperti font).
 */
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts/'], // <-- Arahkan ke folder font Anda
};