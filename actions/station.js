const station = require("../controllers/station")

exports.stationMenu = (action, options) => {
    switch (action[0]) {
        case "ls":
            station.getStations(options.station)
            break;
        case "create":
            if (!action[1])
            console.log("\nStation name is required. Use command:\nmem station create <station-name> --application <application-name>") //Add retention and throughput
            else
            station.createStation(action[1], options)
            break;
        case "edit":
            if (!action[1])
            console.log("\nStation name is required. Use command:\nmem station edit <station-name> --name <new-station-name> --application <application-name>") //Add retention and throughput
            else
            station.editStation(action[1], options) 
            break;
        case "del":
            station.removeStation(action[1], options)
            break;
        default:
            return
    }
};
