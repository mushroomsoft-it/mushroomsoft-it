const fs = require('fs');
const path = require('path');

const url = `https://prod-01.brazilsouth.logic.azure.com:443/workflows/376a472c592841a6bc6ce35242fd5a65/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=k72tjaGBJ90_5KJvskxsPZEjwLAPA1Ii8RswhzvRqUY`;

async function fetchData(url) {
  try {

    const response = await fetch(url);
    const data = await response.json();

    const employeeArray = data.employeeInfo.map(e => {
      const extension = e.attatchmentContent["$content-type"].split("/")[1];
      const imageBuffer = Buffer.from(e.attatchmentContent["$content"], "base64");

      const filePath = path.join(__dirname, "../public", `${e.id}.${extension}`);

      fs.writeFile(filePath, imageBuffer, (err) => {
        if (err) {
          console.error("Error creating profile image: ", err);
        } else {
          console.log(`${e.id}.${extension} created succesfully at public`);
        }
      });

      return {
        en: {
          title: e.infoContent.name,
          subtitle: e.infoContent.en.position,
          description: `<h4>BIO</h4> <p> <b>Career:</b> ${e.infoContent.en.carreer}</p> <p> <b>Expert in:</b> ${e.infoContent.en.expert} </p> <p> <b>Hobby:</b> ${e.infoContent.en.hobby} </p>`,
          image: `${e.id}.${extension}`,
          showDescription: false,
          animate: true,
          actionText: 'See more...'
        },
        es: {
          title: e.infoContent.name,
          subtitle: e.infoContent.es.position,
          description: `<h4>BIOGRAFÍA</h4> <p> <b>Carrera:</b> ${e.infoContent.es.carreer}</p> <p> <b>Experto en:</b> ${e.infoContent.es.expert} </p> <p> <b>Hobby:</b> ${e.infoContent.es.hobby} </p>`,
          image: `${e.id}.${extension}`,
          showDescription: false,
          animate: true,
          actionText: 'Ver más...'
        }
      }

    });

    console.log(employeeArray);

    const publicDir = path.join(__dirname, '../src/app/config/');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    const filePath = path.join(publicDir, 'employees.json');
    fs.writeFileSync(filePath, JSON.stringify(employeeArray, null, 2));

    console.log(`Data saved in: ${filePath}`);
  } catch (error) {
    console.error('Error ocurred:', error);
    process.exit(1);
  }
}

fetchData(url);
