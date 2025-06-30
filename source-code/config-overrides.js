module.exports = function override(config, env) {
  // Find the rule that handles assets like images and audio in Webpack
  const assetRule = config.module.rules
    .find((rule) => rule.oneOf !== undefined)
    .oneOf.find((rule) => rule.test && rule.test.toString().includes('png|jpg|jpeg|gif|svg|mp3|wav'));

  if (assetRule) {
    // Set asset rule type to 'asset/resource' to prevent inlining as base64 for both images and audio
    assetRule.type = 'asset/resource';

    // Optionally, remove the dataUrlCondition to completely avoid inlining
    delete assetRule.parser.dataUrlCondition;
  }

  return config;
};
