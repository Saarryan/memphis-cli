const axios = require('axios').default;
const ApiEndpoint = require("../apiEndpoints")

const factories = [{
    factory_name: "factory 1",
    factory_description: "factory description 1",
}, {
    factory_name: "factory 2",
    factory_description: "factory description 2",
},
{
    factory_name: "factory 3",
    factory_description: "factory description 3",
},
{
    factory_name: "factory 4",
    factory_description: "",
},
{
    factory_name: "factory 5",
    factory_description: null,
},
]


exports.getFactories = async () => {
    // try {
    //     const response = await axios.get(config.SERVER_URL + ApiEndpoint.GET_ALL_QUEUES);
    //     // console.log(response);
    //     console.table(
    //         factorys.map(factory => {
    //             return {
    //                 "factory name": factory.factory_name,
    //                 "factory description": factory.factory_description,
    //             };
    //         })
    //     );
    // } catch (error) {
    //     console.error(error);
    // }
}

exports.createFactory = async (name, options) => {
    try {
        // const response = await axios.post(config.SERVER_URL + ApiEndpoint.GET_ALL_QUEUES, {
        //     factory_name: name, 
        //     factory_description: options.desc
        // });
        console.log(`\nFactory was created. \nDetails:\n  name: ${name}\n  description: ${options.desc}`);
    } catch (error) {
        console.error(error);
    }
}

exports.editFactory = async (name, options) => {
    try {
        console.log(`\nFactory ${name} was edited. \nDetails:`);
        options.name && console.log(`  name: ${options.name}`);
        options.desc && console.log(`  description: ${options.desc}`);
    } catch (error) {
        console.error(error);
    }
}

exports.removenFactory = async (name) => {
    try {
        console.log(`\nFactory ${name} was removed.`);
    } catch (error) {
        console.error(error);
    }
}