const dotenv = require('dotenv').config();

if (dotenv.error) {
  console.error('Error loading .env file');
  process.exit(1);
}

const environmentConst = {
  powerAutomateUri: process.env.POWER_AUTOMATE_URL,
  employeesProfilePhotoFolder: "../public/employeesProfilePhoto",
  publicFolder: "../public/",
  configAppProject: "../src/app/config/",
  dataApp: "employees.json"
}

module.exports = { environmentConst };
