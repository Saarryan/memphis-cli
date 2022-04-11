const factory = require("../controllers/factory")
const isValidToken = require("../utils/validateToken")
const login = require("../controllers/login")

const handleFactoryActions = (action, options) => {
    switch (action[0]) {
        case "ls":
            factory.getFactories()
            break;
        case "create":
            if (!action[1])
                console.log("Factory name is required. Use command:\nmem factory create <factory-name> --desc <factory-description>")
            else
                factory.createFactory(action[1], options)
            break;
        case "edit":
            if (!action[1])
                console.log("Factory name is required. Use command:\nmem factory edit <factory-name> --name <new-factory-name> --desc <new-factory-description>")
            else if (!(options.name || options.desc))
                console.log("New factory name or description is required. Use command:\nmem factory edit <factory-name> --name <new-factory-name> --desc <new-factory-description>")
            else
                factory.editFactory(action[1], options)
            break;
        case "del":
            if (!action[1])
                console.log("Factory name is required. Use command:\nmem factory del <factory-name> ")
            else
                factory.removenFactory(action[1])
            break;
        default:
            return
    }
}

exports.factoryMenu = (action, options) => {
    if (!isValidToken()) {
        login()
            .then(res => {
                handleFactoryActions(action, options)
            })
            .catch((error) => {
                console.log("Failed connecting")
                // console.error(error);
            })
    }
    else handleFactoryActions(action, options)
};

