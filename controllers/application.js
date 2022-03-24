const axios = require('axios').default;
const ApiEndpoint = require("../apiEndpoints")

const applications = [{
    application_name: "application 1",
    application_description: "application description 1",
}, {
    application_name: "application 2",
    application_description: "application description 2",
},
{
    application_name: "application 3",
    application_description: "application description 3",
},
{
    application_name: "application 4",
    application_description: "",
},
{
    application_name: "application 5",
    application_description: null,
},
]


exports.getApplications = async () => {
    // try {
    //     const response = await axios.get(config.SERVER_URL + ApiEndpoint.GET_ALL_QUEUES);
    //     // console.log(response);
    //     console.table(
    //         applications.map(application => {
    //             return {
    //                 "Application name": application.application_name,
    //                 "Application description": application.application_description,
    //             };
    //         })
    //     );
    // } catch (error) {
    //     console.error(error);
    // }
}

exports.createApplication = async (name, options) => {
    try {
        // const response = await axios.post(config.SERVER_URL + ApiEndpoint.GET_ALL_QUEUES, {
        //     application_name: name, 
        //     application_description: options.desc
        // });
        console.log(`\nApplication was created. \nDetails:\n  name: ${name}\n  description: ${options.desc}`);
    } catch (error) {
        console.error(error);
    }
}

exports.editApplication = async (name, options) => {
    try {
        console.log(`\nApplication ${name} was edited. \nDetails:`);
        options.name && console.log(`  name: ${options.name}`);
        options.desc && console.log(`  description: ${options.desc}`);
    } catch (error) {
        console.error(error);
    }
}

exports.removenApplication = async (name) => {
    try {
        console.log(`\nApplication ${name} was removed.`);
    } catch (error) {
        console.error(error);
    }
}