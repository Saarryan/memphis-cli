const axios = require('axios').default;
const { ApiEndpoint } = require("../apiEndpoints")
const config = require("../config/config.json")

const factories = [{
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


exports.getFactories = async (application) => {
    try {
        application && console.log(`flag -p with application name: ${application}`)
        console.log("\n")
        console.table(
            factories.map(factory => {
                return {
                    "application name": factory.application_name,
                    "factory name": factory.factory_name,
                    "retention type": factory.retention_type,
                    "retentention value": factory.retentention_value,
                    "max_throughput type": factory.max_throughput_type,
                    "max_throughput value": factory.max_throughput_value,
                };
            })
        );
    } catch (error) {
        console.error(error);
    }
}

exports.createFactory = async (name, options) => {
    try {
        // const response = await axios.post(config.SERVER_URL + ApiEndpoint.GET_ALL_QUEUES, {
        //     application_name: name, 
        //     application_description: options.desc
        // });
        console.log(`\nFactory was created.`);
        console.table([{ "application name": options.application, "factory name": name }])
    } catch (error) {
        console.error(error);
    }
}

exports.editFactory = async (name, options) => {
    try {
        console.log(`\nFactory ${name} was edited.\nDetails:`);
        if (options.name) {
            if (options.application)
                console.table([{ "factory name": options.name, "application name": options.application }])
            else
                console.table([{ "factory name": options.name }])
        }
        else
            console.table([{ "application name": options.application }])
    } catch (error) {
        console.error(error);
    }
}

exports.removeFactory = async (name) => {
    try {
        console.log(`\nFactory ${name} was removed.`);
    } catch (error) {
        console.error(error);
    }
}