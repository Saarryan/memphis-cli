const station = require("../controllers/station")
const isValidToken = require("../utils/validateToken")
const login = require("../controllers/login")


exports.stationMenu = (action, options) => {
    if (!isValidToken())
        login()
    switch (action[0]) {
        // case "ls":
        //     //mock
        //     station.getStations(options.station)
        //     break;
        // case "create":
        //     if (!action[1])
        //         console.log("Station name is required. Use command:\nmem station create <station-name> --application <application-name>") //Add retention and throughput
        //     else
        //         station.createStation(action[1], options)
        //     break;
        case "info":
            if (!action[1])
                console.log("Station name is required. Use command:\nmem station info <station-name>") //Add retention and throughput
            else
                station.getStatopnInfo(action[1])
            break;
        // case "edit":
        //     if (!action[1])
        //         console.log("\nStation name is required. Use command:\nmem station edit <station-name> --name <new-station-name> --application <application-name>") //Add retention and throughput
        //     else
        //         station.editStation(action[1], options)
        //     break;
        case "del":
            if (!action[1])
                console.log("Station name is required. Use command:\nmem del <station-name>")
            else
                station.removeStation(action[1], options)
            break;
        default:
            return
    }
};
