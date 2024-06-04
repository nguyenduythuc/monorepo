/** @type {import('next').NextConfig} */
import path from 'path';
const nextConfig = {
  webpack: (config, { defaultLoaders }) => {
    // Resolve modules from the root node_modules
    config.resolve.modules = [
      path.resolve('node_modules'),
      path.resolve('../../node_modules'), // Ensure it checks the root node_modules
      'node_modules',
    ];

    // Resolve extensions
    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ];

    // Alias for React Native Web and shared components
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
      'shared': path.resolve('../shared'),
    };

    return config;
  },
};

export default nextConfig;
