const users = require("../controllers/users")
const inputValidation = require("../utils/inputValidations")

exports.userMenu = (action, options) => {
    // console.log(action)
    // console.log(options)
    switch (action[0]) {
        case "ls":
            users.getUsers()
            break;
        case "add":
            if (!inputValidation.validateUserType(options.type) || !inputValidation.validateAvatar(options.avatar) || !inputValidation.validatePassword(options.password))
                console.log(`\nMake sure password length is at list 6 charachters, user type is manahement/application and avatar is 1/2/3/4.\nUse command:\nmem user add --name <user-name> --password <user-password> --type <user-type> --avatar <avatar-id> --hubuser <hub-username> --hubpass <hub-password>`)
            else
                users.addUser(options)
            break;
        case "del":
            if (!options.name)
                console.log("\nUser name is required. Use command:\nmem user del <user-name> ")
            else
                users.removeUser(options)
            break;
        case "edithubcred":
            if (!options.hubuser || !options.hubpass)
                console.log("\nHub user name or hub user password is required. Use command:\nmem user edithubcred --hubuser <hub-username> --hubpass <hub-password>")
            else
                users.edithubcred(options)
            break;
        default:
            return
    }
};
