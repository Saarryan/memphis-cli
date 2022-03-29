const ApiEndpoint = require("../apiEndpoints")
const httpRequest = require("../services/httpRequest")
const fs = require('fs');

const stations = [{
    factory_name: "factory1",
    application_name: "application1",
    retention_type: "time",
    retentention_value: "1 week",
    max_throughput_type: "messsages",
    max_throughput_value: "100000",
}, {
    factory_name: "factory2",
    application_name: "application1",
    retention_type: "time",
    retentention_value: "1 day",
    max_throughput_type: "bytes",
    max_throughput_value: "100000",
},
{
    factory_name: "factory3",
    application_name: "application1",
    retention_type: "time",
    retentention_value: "1 week",
    max_throughput_type: "bytes",
    max_throughput_value: "5000000",
},
{
    factory_name: "factory4",
    application_name: "application2",
    retention_type: "time",
    retentention_value: "1 week",
    max_throughput_type: "bytes",
    max_throughput_value: "500000",
},
{
    factory_name: "factory5",
    application_name: "application3",
    retention_type: "time",
    retentention_value: "1 week",
    max_throughput_type: "messsages",
    max_throughput_value: "15000",
},
]


exports.getStations = async (application) => {
    try {
        application && console.log(`flag -p with application name: ${application}`)
        console.log("\n")
        console.table(
            stations.map(station => {
                return {
                    "application name": station.application_name,
                    "station name": station.factory_name,
                    "retention type": station.retention_type,
                    "retentention value": station.retentention_value,
                    "max_throughput type": station.max_throughput_type,
                    "max_throughput value": station.max_throughput_value,
                };
            })
        );
    } catch (error) {
        console.error(error);
    }
}

exports.createStation = async (station, options) => {
    try {
        const data = fs.readFileSync('.memconfig', 'utf8')
        if (data.length == 0) {
            return
        }
        const credentials = JSON.parse(data.toString())
        httpRequest({
            method: "POST",
            url: `${credentials.server}${ApiEndpoint.CREATE_STATION}`,
            headers: { 'Authorization': 'Bearer ' + credentials.jwt },
            bodyParams: {
                "name": station,
                "factory_name": options.factory,
                "retention_type": options.retentiontype,
                "retention_value": options.retentionvalue,
                "storage_type": options.storage,
                "replicas": options.replicas,
                "dedup_enabled": options.dedupenabled,
                "dedup_window_in_ms": options.dedupwindow
            },
            queryParams: null,
            timeout: 0,
        })
            .then(res => {
                console.log(`Station ${station} was created with the following details:`)
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
                console.log(`Failed creating ${station} station.`)
            })
    } catch (error) {
        console.error(error);
    }
}

exports.getStatopnInfo = async (station) => {
    try {
        const data = fs.readFileSync('.memconfig', 'utf8')
        if (data.length == 0) {
            return
        }
        const credentials = JSON.parse(data.toString())
        httpRequest({
            method: "GET",
            url: `${credentials.server}${ApiEndpoint.GET_STATION_INFO}?station_name=${station}`,
            headers: { 'Authorization': 'Bearer ' + credentials.jwt },
            bodyParams: null,
            queryParams: null,
            timeout: 0,
        })
            .then(res => {
                console.log("Station info:")
                console.log(res)
            })
            .catch((error) => {
                console.log(`Failed fetching ${station} station details.`)
            })
    } catch (error) {
        console.error(error);
    }
}

// exports.editStation = async (name, options) => {
//     try {
//         console.log(`\nStation ${name} was edited.\nDetails:`);
//         if (options.name) {
//             if (options.application)
//                 console.table([{ "station name": options.name, "application name": options.application }])
//             else
//                 console.table([{ "station name": options.name }])
//         }
//         else
//             console.table([{ "application name": options.application }])
//     } catch (error) {
//         console.error(error);
//     }
// }

exports.removeStation = async (station) => {
    try {
        const data = fs.readFileSync('.memconfig', 'utf8')
        if (data.length == 0) {
            return
        }
        const credentials = JSON.parse(data.toString())
        httpRequest({
            method: "DELETE",
            url: `${credentials.server}${ApiEndpoint.REMOVE_STATION}`,
            headers: { 'Authorization': 'Bearer ' + credentials.jwt },
            bodyParams: {
                "station_name": station,
            },
            queryParams: null,
            timeout: 0,
        })
            .then(res => {
                Object.keys(res).length === 0 ? console.log(`Statoin ${station} was removed.`) : console.log(`Failed removing station ${station}.`)
            })
            .catch((error) => {
                console.log(`Failed removing station ${station}.`)
            })
    } catch (error) {
        console.error(error);
    }
}