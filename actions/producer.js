const producer = require("../controllers/producer")
const isValidToken = require("../utils/validateToken")
const login = require("../controllers/login")

const handleProducerActions = (action, options) => {
    switch (action[0]) {
        case "ls":
            if(!options.station)
                producer.getProducers()
            else if(options.station)
                producer.getProducersByStation(options.station)
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

