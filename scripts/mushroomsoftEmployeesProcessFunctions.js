const fs = require('fs');
const path = require('path');
const { environmentConst } = require('./config/environment');

async function fetchEmployeesData(url) {
  const response = await fetch(url);

  return await response.json();
}

function processEmployeeData(employeeData) {
  const processedData = employeeData.employeeInfo.map(e => {
    const extension = e.attatchmentContent["$content-type"].split("/")[1];
    const imageBuffer = Buffer.from(e.attatchmentContent["$content"], "base64");

    const filePath = path.join(__dirname, environmentConst.employeesProfilePhotoFolder, `${e.id}.${extension}`);

    fs.writeFile(filePath, imageBuffer, (err) => {
      if (err) {
        console.error("Error creating profile image: ", err);
      } else {
        console.log(`${e.id}.${extension} created succesfully at public`);
      }
    });

    return {
      id:e.id,
      en: {
        title: e.infoContent.name,
        subtitle: e.infoContent.en.position,
        description: `<h4>BIO</h4> <p> <b>Career:</b> ${e.infoContent.en.carreer}</p> <p> <b>Expert in:</b> ${e.infoContent.en.expert} </p> <p> <b>Hobby:</b> ${e.infoContent.en.hobby} </p>`,
        image: `employeesProfilePhoto/${e.id}.${extension}`,
        showDescription: false,
        animate: true,
        actionText: 'See more...'
      },
      es: {
        title: e.infoContent.name,
        subtitle: e.infoContent.es.position,
        description: `<h4>BIOGRAFÍA</h4> <p> <b>Carrera:</b> ${e.infoContent.es.carreer}</p> <p> <b>Experto en:</b> ${e.infoContent.es.expert} </p> <p> <b>Hobby:</b> ${e.infoContent.es.hobby} </p>`,
        image: `employeesProfilePhoto/${e.id}.${extension}`,
        showDescription: false,
        animate: true,
        actionText: 'Ver más...'
      }
    }
  });


  return processedData;
}

function findDeletedImagesById (originalArray, updatedArray) {
  const idsUpdatedSet = new Set(updatedArray.map(item => item.id));
  const imageLinks = originalArray.filter(item => !idsUpdatedSet.has(item.id)).map(item => item.en.image);

  return imageLinks
}

function deleteImagesFromPublic (employeesAfterUpdate, publicDir) {
      let employeesBeforeUpdate;
      let filePath = path.join(publicDir, environmentConst.dataApp);

      if (fs.existsSync(filePath)) {
        try {
          const data = fs.readFileSync(filePath, 'utf8');
          employeesBeforeUpdate = JSON.parse(data);

          const deletedImages = findDeletedImagesById(employeesBeforeUpdate, employeesAfterUpdate);

          if(deletedImages) {
            deletedImages.forEach(imageLink => {
              const fileImagePath = path.join(__dirname, environmentConst.publicFolder, `${imageLink}`);
              if (fs.existsSync(fileImagePath)) {
                fs.unlinkSync(fileImagePath);
                console.log(`Image deleted: ${fileImagePath}`);
              }
            });
          }
        } catch (error) {
            console.error('Error: ', error.message);
        }
      }

}

function writeAndSaveEmployees (publicDir, filePath, employeesAfterUpdate)
{
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  filePath = path.join(publicDir, environmentConst.dataApp);
  fs.writeFileSync(filePath, JSON.stringify(employeesAfterUpdate, null, 2));

  console.log(`Data saved in: ${filePath}`);

}

async function fetchData(url) {
  console.log("Running mushroomsoftEmployeesData.js");

  try {
    const data = await fetchEmployeesData(url);

    console.log("Data fetched sucessfully!");
    console.log("Data process started");

    const employeesAfterUpdate = processEmployeeData(data);

    console.log("Data process finished sucessfully!");
    console.log("Delete images started");

    const publicDir = path.join(__dirname, environmentConst.configAppProject);
    let filePath = path.join(publicDir, environmentConst.dataApp);

    deleteImagesFromPublic(employeesAfterUpdate, publicDir);

    console.log("Image deleted sucessfully!");
    console.log("Write and save info process started");

    writeAndSaveEmployees(publicDir, filePath, employeesAfterUpdate);

    console.log("Write and save info process finished sucessfully!");
    console.log("mushroomsoftEmployeesData.js ran sucessfully!");

  } catch (error) {
    console.error('Error ocurred:', error);
    process.exit(1);
  }
}

module.exports = {fetchData};
