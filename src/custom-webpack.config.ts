const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    new Dotenv({
      path: './.env',
      systemvars: true, // Lee también de variables del sistema (CI/CD)
      allowEmptyValues: true, // Permite valores vacíos sin fallar
      silent: true, // No lanza error si falta .env
    }),
  ],
};
