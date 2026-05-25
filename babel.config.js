module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module:react-native-dotenv',
                {
                    moduleName: '@env',
                    path: '.env',
                },
            ],
            [
                'module-resolver',
                {
                    root: ['./'],
                    alias: {
                        '@': './src',
                        '@components': './src/components',
                        '@screens': './src/screens',
                        '@services': './src/services',
                        '@types': './src/types',
                        '@assets': './assets',
                    },
                    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
                },
            ],
        ],
    };
};