const fs = require('fs');
const path = require('path');

const url = `https://prod-01.brazilsouth.logic.azure.com:443/workflows/376a472c592841a6bc6ce35242fd5a65/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=k72tjaGBJ90_5KJvskxsPZEjwLAPA1Ii8RswhzvRqUY`;

async function fetchData(url) {
  try {

    const response = await fetch(url);
    const data = await response.json();

    // `public` exist?
    const publicDir = path.join(__dirname, '../src/app/config/');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // // Guardar data in `public`
    const filePath = path.join(publicDir, 'employees.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    console.log(`Data saved in: ${filePath}`);
  } catch (error) {
    console.error('Error ocurred:', error);
    process.exit(1);
  }
}

fetchData(url);
