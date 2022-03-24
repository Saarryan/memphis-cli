const factory = require("../controllers/factory")

exports.factorynMenu = (action, options) => {
    switch (action[0]) {
        case "ls":
            factory.getFactories()
            break;
        case "create":
            if (!action[1])
                console.log("\nFactory name is required. Use command:\nmem factory create <factory-name> --desc <factory-description>")
            else
            factory.createFactory(action[1], options)
            break;
        case "edit":
            if (!action[1])
                console.log("\nFactory name is required. Use command:\nmem factory edit <factory-name> --name <new-name> --desc <new-factory-name>")
            else if (!(options.name || options.desc))
                console.log("\nSome flag required")
            else
            factory.editFactory(action[1], options)
            break;
        case "del":
            if (!action[1])
                console.log("\nFactory name is required. Use command:\nmem factory del <factory-name> ")
            else
            factory.removeFactory(action[1])
            break;
        default:
            return
    }
};
