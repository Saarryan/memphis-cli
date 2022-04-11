const producer = require("../controllers/producer")
const isValidToken = require("../utils/validateToken")
const login = require("../controllers/login")

const handleProducerActions = (action, options) => {
    switch (action[0]) {
        case "ls":
            if(!action[1])
                producer.getProducers()
            else if((action[1] === '--station' || action[1] === '-s') && action[2] )
                producer.getProducersByStation(action[2])
            else
            console.log("Use command:\nmem producer ls\nOR\nmem producer ls --station <station-name>")
            break;
        default:
            return
    }
}

exports.producerMenu = (action, options) => {
    if (!isValidToken()) {
        login()
            .then(res => {
                handleProducerActions(action, options)
            })
            .catch((error) => {
                console.log("Failed connecting")
                // console.error(error);
            })
    }
    else handleProducerActions(action, options)
};

