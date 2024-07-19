const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { generate } = require("@storybook/react-native/scripts/generate");
const path = require("path");

generate({
  configPath: path.resolve(__dirname, "./.ondevice"),
});

const config = getDefaultConfig(__dirname);

config.transformer.unstable_allowRequireContext = true;

config.resolver.sourceExts.push("mjs");
config.resolver.assetExts.push("db");

module.exports = withNativeWind(config, { input: "./src/global.css" });
