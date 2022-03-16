const application = require("../controllers/application")

exports.applicationMenu = (action, options) => {
    switch (action[0]) {
        case "ls":
            application.getApplications()
            break;
        case "create":
            if (!action[1])
                console.log("\nApplication name is required. Use command:\nstrech application create <application-name> --desc <application-description>")
            else
                application.createApplication(action[1], options)
            break;
        case "edit":
            if (!action[1])
                console.log("\nApplication name is required. Use command:\nstrech application edit <application-name> --name <new-name> --desc <new-application-name>")
            else if (!(options.name || options.desc))
                console.log("\nSome flag required")
            else
                application.editApplication(action[1], options)
            break;
        case "del":
            if (!action[1])
                console.log("\nApplication name is required. Use command:\nstrech application del <application-name> ")
            else
                application.removeApplication(action[1])
            break;
        default:
            return
    }
};
