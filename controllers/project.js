const axios = require('axios').default;
const { ApiEndpoint } = require("../apiEndpoints")
const config = require("../config/config.json")

const projects = [{
    project_name: "project 1",
    project_description: "project description 1",
}, {
    project_name: "project 2",
    project_description: "project description 2",
},
{
    project_name: "project 3",
    project_description: "project description 3",
},
{
    project_name: "project 4",
    project_description: "",
},
{
    project_name: "project 5",
    project_description: null,
},
]


exports.getProjects = async () => {
    try {
        const response = await axios.get(config.SERVER_URL + ApiEndpoint.GET_ALL_QUEUES);
        // console.log(response);
        console.table(
            projects.map(project => {
                return {
                    "Project name": project.project_name,
                    "Project description": project.project_description,
                };
            })
        );
    } catch (error) {
        console.error(error);
    }
}

exports.createProject = async (name, options) => {
    try {
        // const response = await axios.post(config.SERVER_URL + ApiEndpoint.GET_ALL_QUEUES, {
        //     project_name: name, 
        //     project_description: options.desc
        // });
        console.log(`\nProject was created. \nDetails:\n  name: ${name}\n  description: ${options.desc}`);
    } catch (error) {
        console.error(error);
    }
}

exports.editProject = async (name, options) => {
    try {
        console.log(`\nProject ${name} was edited. \nDetails:`);
        options.name && console.log(`  name: ${options.name}`);
        options.desc && console.log(`  description: ${options.desc}`);
    } catch (error) {
        console.error(error);
    }
}

exports.removeProject = async (name) => {
    try {
        console.log(`\nProject ${name} was removed.`);
    } catch (error) {
        console.error(error);
    }
}