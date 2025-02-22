const employeeProcessFunctions = require('./mushroomsoftEmployeesProcessFunctions.js');
const { environmentConst } = require('./config/environment.js')

employeeProcessFunctions.fetchData(environmentConst.powerAutomateUri);
