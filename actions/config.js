
const login = require("../controllers/login")
const fs = require('fs');

module.exports = (credentials) => {
     const credentialsDetails = {
          user: credentials.user,
          password: credentials.password,
          server: credentials.server,
     };
     const data = JSON.stringify(credentialsDetails);
     fs.writeFile('.memconfig', data, function (err) {
          if (err) {
               console.log('There has been an error saving your configuration data.');
               console.log(err.message);
               return;
          }
     });
     login()
}
