const users = require("../controllers/users")

exports.userMenu = (action, options) => {
    switch (action[0]) {
        case "ls":
            users.getUsers()
            break;
        case "add":
            if (!action[1])
                console.log("\nUser name is required. Use command:\nstrech user add <user-name> ")
            else
                users.addUser(action[1])
            break;
        case "del":
            if (!action[1])
                console.log("\nUser name is required. Use command:\nstrech user del <user-name> ")
            else
                users.removeUser(action[1])
            break;
        case "regeneratepass":
            if (!action[1])
                console.log("\nUser name is required. Use command:\nstrech user regeneratepass <user-name>")
            else
                users.reGeneratePass(action[1])
            break;
        default:
            return
    }
};
