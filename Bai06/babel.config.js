module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      // Nếu cần alias (thử nếu icon vẫn lỗi)
      [
        'module-resolver',
        {
          alias: {
            'react-native-vector-icons': '@expo/vector-icons',
          },
        },
      ],
    ],
  };
};