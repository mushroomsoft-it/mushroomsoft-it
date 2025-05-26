const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

const env = process.env['ENVIRONMENT'];

module.exports = {
  plugins: [
    ...(env !== 'production' && env !== 'qa'
      ? [new Dotenv()]
      : [new webpack.EnvironmentPlugin(['COPILOT_URL_TOKEN'])]),
  ],
};
