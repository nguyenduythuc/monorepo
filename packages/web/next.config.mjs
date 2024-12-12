import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
import dotenv from 'dotenv';

dotenv.config();

/** @type {import('next').NextConfig} */
import path from 'path';
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals.push({
        bufferutil: 'bufferutil',
        'utf-8-validate': 'utf-8-validate',
      });
    }

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
      '@lfvn-customer/shared': path.resolve('../shared'),
      // Thêm alias để bỏ qua thư viện không tương thích
      'react-native-keychain': path.resolve('./src/emptyModule.ts'),
      'react-native-toast-message': path.resolve('./src/emptyModule.ts'),
      '@react-native/assets-registry/registry': path.resolve(
        './src/emptyModule.ts',
      ),
      'react-native-confirmation-code-field': path.resolve(
        './src/emptyModule.ts',
      ),
      canvas: path.resolve('./src/emptyModule.ts'), // Alias for canvas
    };

    return config;
  },
  env: {
    BASE_API_URL: process.env.BASE_API_URL,
  },
};

export default withNextIntl(nextConfig);
