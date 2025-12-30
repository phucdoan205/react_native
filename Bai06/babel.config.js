module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'], // Đảm bảo có dòng này cho lỗi Reanimated trước đó
  };
};