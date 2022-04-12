
const login = require("../controllers/login")
const fs = require('fs');

module.exports = (credentials) => {
     try {
          const credentialsDetails = {
               user: credentials.user,
               password: credentials.password,
               server: credentials.server,
          };
          const data = JSON.stringify(credentialsDetails);
          fs.writeFileSync('.memconfig', data);
          return login()
               .then(res => {
                    if (res)
                         console.log("Connected successfully to Memphis server.")
                    else {
                         console.log("Failes connecting to Memphis server.")
                         fs.writeFileSync('.memconfig', "");
                    }
                    return res
               })
               .catch((error) => {
                    if (error.status === 666){
                         console.log(error.errorObj.message);
                    } else {
                         console.log("Failed connecting")
                    }
               });
        } catch (error) {
          if (error.status === 666){
               console.log(error.errorObj.message);
          } else {
               console.log("Failed connecting")
          }
        }

        
     
}
