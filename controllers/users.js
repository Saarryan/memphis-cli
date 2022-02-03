const axios = require('axios').default;
const { ApiEndpoint } = require("../apiEndpoints")
const config = require("../config/config.json")

const users = [{
    user_name: "user1",
    password: "String (Hash)",
    hub_user_name: "user1",
    hub_password: "String (Hash)"
},
{
    user_name: "user2",
    password: "String (Hash)",
    hub_user_name: "user2",
    hub_password: "String (Hash)"
},
{
    user_name: "user3",
    password: "String (Hash)",
    hub_user_name: "user3",
    hub_password: "String (Hash)"
},
{
    user_name: "user4",
    password: "String (Hash)",
    hub_user_name: "user3",
    hub_password: "String (Hash)"
},
{
    user_name: "user4",
    password: "String (Hash)",
    hub_user_name: "user4",
    hub_password: "String (Hash)"
},
]


exports.getUsers = async () => {
    try {
        const response = await axios.get(config.SERVER_URL + ApiEndpoint.GET_ALL_QUEUES);
        // console.log(response);
        console.table(
            users.map(user => {
                return {
                    "user_name": user.user_name,
                    "password": user.password,
                    "hub_user_name": user.hub_user_name,
                    "hub_password": user.hub_password
                };
            })
        );
    } catch (error) {
        console.error(error);
    }
}

exports.addUser = async (name) => {
    try {
        console.log(`\User was created. Please copy the password, it will only appear once! \nDetails:\n  user name: ${name.toLowerCase()}\n  password: some password`);
    } catch (error) {
        console.error(error);
    }
}

exports.removeUser = async (name) => {
    try {
        console.log(`\User ${name} was removed.`);
    } catch (error) {
        console.error(error);
    }
}

exports.reGeneratePass = async (name) => {
    try {
        console.log(`\User's ${name} password was regenerated. Please copy the new password, it will only appear once!\n  password: some password`);
    } catch (error) {
        console.error(error);
    }
}
