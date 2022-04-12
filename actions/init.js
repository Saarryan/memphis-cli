const isValidToken = require("../utils/validateToken")
const login = require("../controllers/login")
const fs = require('fs');

const handleInitActions = (action, options) => {
    let language = action.lang || "nodejs"
    const allowedLang = ["nodejs"]
    if(!allowedLang.includes(language)){
        console.log(`The language you selected is not supported yet\nSupported languages: ${allowedLang}`)
    }
    else{
        let type;
        switch (language){
            case "nodejs":
                type = 'js'
        }
        const fileName = 'index.' + type;
        fs.writeFileSync(fileName, 'Welcome to Memphis');
    }
}

exports.initMenu = (action, options) => {
    if (!isValidToken()) {
        login()
            .then(res => {
                handleInitActions(action, options)
            })
            .catch((error) => {
                if (error.status === 666){
                    console.log(error.errorObj.message);
                } else {
                    console.log("Failed connecting")
                }
            })
    }
    else handleInitActions(options)
};

