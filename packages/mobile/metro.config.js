const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// Path to the root directory of your monorepo
const rootPath = path.resolve(__dirname, '../../');

// Watch folders for symlinks and hoisted node_modules
const watchFolders = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(rootPath, 'node_modules'),
  // Add other shared packages if needed
  path.resolve(rootPath, 'packages/shared'),
];

const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

// Resolver settings
const resolver = {
  unstable_enableSymlinks: true, // Enable symlink support
};

const config = {
  watchFolders,
  resolver,
};

module.exports = mergeConfig(
  getDefaultConfig(__dirname),
  wrapWithReanimatedMetroConfig(config),
);
