const users = require("../controllers/users")
const inputValidation = require("../utils/inputValidations")
const isValidToken = require("../utils/validateToken")
const login = require("../controllers/login")

const handleUserActions = (action, options) => {
    switch (action[0]) {
        case "ls":
            users.getUsers()
            break;
        case "add":
            if (!options.name || !options.password)
                console.log(`User name and password are required. Use command:\nmem user add --name <user-name> --password <user-password> --type <user-type> --avatar <avatar-id>`) //--hubuser <hub-username> --hubpass <hub-password>`)
            else
                users.addUser(options)
            break;
        case "del":
            if (!action[1])
                console.log("User name is required. Use command:\nmem user del <user-name> ")
            else
                users.removeUser(action[1])
            break;
        // case "edithubcred":
        //     if (!options.hubuser || !options.hubpass)
        //         console.log("Hub user name or hub user password is required. Use command:\nmem user edithubcred --hubuser <hub-username> --hubpass <hub-password>")
        //     else
        //         users.edithubcred(options)
        //     break;
        default:
            return
    }
}

exports.userMenu = (action, options) => {
    if (!isValidToken()) {
        login()
            .then(res => {
                handleUserActions(action, options)
            })
            .catch((error) => {
                // console.error(error);
                console.log("Failed connecting")
            })
    }
    else handleUserActions(action, options)
};
