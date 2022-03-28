const users = require("../controllers/users")
const inputValidation = require("../utils/inputValidations")
const isValidToken = require("../utils/validateToken")
const login = require("../controllers/login")

exports.userMenu = (action, options) => {
    if (!isValidToken())
        login()
    switch (action[0]) {
        case "ls":
            users.getUsers()
            break;
        case "add":
            if (!inputValidation.validateUserType(options.type) || !inputValidation.validateAvatar(options.avatar) || !inputValidation.validatePassword(options.password))
                console.log(`Make sure password length is at list 6 charachters, user type is manahement/application and avatar is 1/2/3/4.\nUse command:\nmem user add --name <user-name> --password <user-password> --type <user-type> --avatar <avatar-id> --hubuser <hub-username> --hubpass <hub-password>`)
            else
                users.addUser(options)
            break;
        case "del":
            if (!action[1])
                console.log("User name is required. Use command:\nmem user del <user-name> ")
            else
                users.removeUser(action[1])
            break;
        case "edithubcred":
            if (!options.hubuser || !options.hubpass)
                console.log("Hub user name or hub user password is required. Use command:\nmem user edithubcred --hubuser <hub-username> --hubpass <hub-password>")
            else
                users.edithubcred(options)
            break;
        default:
            return
    }
};
