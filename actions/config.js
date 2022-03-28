
const login = require("../controllers/login")
const fs = require('fs');

module.exports = (credentials) => {
     const credentialsDetails = {
          user: credentials.user,
          password: credentials.password,
          server: credentials.server,
     };
     const data = JSON.stringify(credentialsDetails);
     fs.writeFileSync('.memconfig', data);
     return login()
          .then(res => { return res })
          .catch((error) => {
               return error
          });
}
