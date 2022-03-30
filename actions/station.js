const station = require("../controllers/station")
const isValidToken = require("../utils/validateToken")
const login = require("../controllers/login")

const handleStatoionActions = (action, options) => {
    switch (action[0]) {
        case "ls":
            station.getAllStations()
            break;
        case "create":
            if (!action[1]) {
                console.log("Station name is required. Use command:\nmem station create <station-name> --factory <factory> --retentiontype <retention-type> --retentionvalue <retention-value> --storage <storage-type> --replicas <replicas> --dedupenabled <dedup-enabled> --dedupwindow <dedup-window-in-ms>")
                console.log("Note:")
                console.log("retentiontype values: time/messages/bytes")
                console.log("dedupenabled values: true/false")
                console.log("storage values: file/memory")
            }
            else
                station.createStation(action[1], options)
            break;
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
}

exports.stationMenu = (action, options) => {
    if (!isValidToken()) {
        login()
            .then(res => {
                handleStatoionActions(action, options)
            })
            .catch((error) => {
                // console.error(error);
                console.log("Failed connecting")
            })
    }
    else handleStatoionActions(action, options)
};

