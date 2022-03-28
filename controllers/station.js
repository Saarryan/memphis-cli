const axios = require('axios').default;
const ApiEndpoint = require("../apiEndpoints")

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

exports.createStation = async (name, options) => {
    try {
        // const response = await axios.post(config.SERVER_URL + ApiEndpoint.GET_ALL_QUEUES, {
        //     application_name: name, 
        //     application_description: options.desc
        // });
        console.log(`\nStation was created.`);
        console.table([{ "application name": options.application, "station name": name }])
    } catch (error) {
        console.error(error);
    }
}

exports.editStation = async (name, options) => {
    try {
        console.log(`\nStation ${name} was edited.\nDetails:`);
        if (options.name) {
            if (options.application)
                console.table([{ "station name": options.name, "application name": options.application }])
            else
                console.table([{ "station name": options.name }])
        }
        else
            console.table([{ "application name": options.application }])
    } catch (error) {
        console.error(error);
    }
}

exports.removeStation = async (name) => {
    try {
        console.log(`\nStation ${name} was removed.`);
    } catch (error) {
        console.error(error);
    }
}