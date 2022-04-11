const consumer = require("../controllers/consumer")
const isValidToken = require("../utils/validateToken")
const login = require("../controllers/login")

const handleConsumerActions = (action, options) => {
    switch (action[0]) {
        case "ls":
            if(!action[1])
                consumer.getConsumers()
            else if((action[1] === '--station' || action[1] === '-s') && action[2] )
                consumer.getConsumersByStation(action[2])
            else
            console.log("Use command:\nmem consumer ls\nOR\nmem consumer ls --station <station-name>")
            break;
        default:
            return
    }
}

exports.consumerMenu = (action, options) => {
    if (!isValidToken()) {
        login()
            .then(res => {
                handleConsumerActions(action, options)
            })
            .catch((error) => {
                console.log("Failed connecting")
                // console.error(error);
            })
    }
    else handleConsumerActions(action, options)
};

