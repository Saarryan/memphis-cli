
const factory = require("../controllers/factory")

exports.factoryMenu = (action, options) => {
    switch (action[0]) {
        case "ls":
            factory.getFactories(options.application)
            break;
        case "create":
            if (!action[1])
            console.log("\nFactory name is required. Use command:\nstrech factory create <factory-name> --application <application-name>") //Add retention and throughput
            else
            factory.createFactory(action[1], options)
            break;
        case "edit":
            if (!action[1])
            console.log("\nFactory name is required. Use command:\nstrech factory edit <factory-name> --name <new-factory-name> --application <application-name>") //Add retention and throughput
            else
            factory.editFactory(action[1], options) 
            break;
        case "del":
            factory.removeFactory(action[1], options)
            break;
        default:
            return
    }
};
