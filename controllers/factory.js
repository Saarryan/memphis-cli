const axios = require('axios').default;
const { ApiEndpoint } = require("../apiEndpoints")
const config = require("../config/config.json")

const factories = [{
    factory_name: "factory1",
    project_name: "project1",
    retention_type: "time",
    retentention_value: "1 week",
    max_throughput_type: "messsages",
    max_throughput_value: "100000",
}, {
    factory_name: "factory2",
    project_name: "project1",
    retention_type: "time",
    retentention_value: "1 day",
    max_throughput_type: "bytes",
    max_throughput_value: "100000",
},
{
    factory_name: "factory3",
    project_name: "project1",
    retention_type: "time",
    retentention_value: "1 week",
    max_throughput_type: "bytes",
    max_throughput_value: "5000000",
},
{
    factory_name: "factory4",
    project_name: "project2",
    retention_type: "time",
    retentention_value: "1 week",
    max_throughput_type: "bytes",
    max_throughput_value: "500000",
},
{
    factory_name: "factory5",
    project_name: "project3",
    retention_type: "time",
    retentention_value: "1 week",
    max_throughput_type: "messsages",
    max_throughput_value: "15000",
},
]


exports.getFactories = async (project) => {
    try {
        project && console.log(`flag -p with project name: ${project}`)
        console.log("\n")
        console.table(
            factories.map(factory => {
                return {
                    "project name": factory.project_name,
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
        //     project_name: name, 
        //     project_description: options.desc
        // });
        console.log(`\Factory was created. \nDetails:\n  name: ${name}\n  project: ${options.project}`);
    } catch (error) {
        console.error(error);
    }
}

exports.editFactory = async (name, options) => {
    try {
        console.log(`\nFactory ${name} was edited. \nDetails:`);
        options.name && console.log(`  name: ${options.name}`);
        options.project && console.log(`  description: ${options.project}`);
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