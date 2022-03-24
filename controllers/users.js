const ApiEndpoint = require("../apiEndpoints")
const httpRequest = require("../services/httpRequest")
const isValidToken = require("../utils/validateToken")
const login = require("./login")
const fs = require('fs');

exports.getUsers = async () => {
    if (!isValidToken())
        login()
    try {
        fs.readFile('.memconfig', 'utf8', (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            let credentials = JSON.parse(data);
            httpRequest({
                method: "GET",
                url: `${credentials.server}${ApiEndpoint.GET_ALL_USERS}`,
                headers: { 'Authorization': 'Bearer ' + credentials.jwt },
                bodyParams: null,
                queryParams: null,
                timeout: 0,
            })
                .then(res => {
                    console.table(
                        res.map(user => {
                            return {
                                "user_name": user.username,
                                "creation_date": user.creation_date,
                                "user_type": user.user_type,
                            };
                        }))
                })
                .catch((error) => {
                    console.error(error.response.status); //handel it
                })
        })
    } catch (error) {
        console.error((error));
    }
}

exports.addUser = async (user) => {
    if (!isValidToken())
        login()
    try {
        fs.readFile('.memconfig', 'utf8', (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            let credentials = JSON.parse(data);
            httpRequest({
                method: "POST",
                url: `${credentials.server}${ApiEndpoint.ADD_USER}`,
                headers: { 'Authorization': 'Bearer ' + credentials.jwt },
                bodyParams: {
                    "username": user.name,
                    "password": user.password,
                    "hub_username": user.hubuser,
                    "hub_password": user.hubpass,
                    "user_type": user.type,
                    "avatar_id": parseInt(user.avatar),
                },
                queryParams: null,
                timeout: 0,
            })
                .then(res => {
                    console.log(`\nUser ${res.username} was created.`);
                })
                .catch((error) => {
                    console.error(JSON.stringify(error))
                    // console.error(error.response.status); //handel it
                })
        })
    } catch (error) {
        console.error((error));
    }
}

exports.removeUser = async (user) => {
    if (!isValidToken())
        login()
    try {
        fs.readFile('.memconfig', 'utf8', (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            let credentials = JSON.parse(data);
            httpRequest({
                method: "DELETE",
                url: `${credentials.server}${ApiEndpoint.REMOVE_USER}`,
                headers: { 'Authorization': 'Bearer ' + credentials.jwt },
                bodyParams: { "username": user.name },
                queryParams: null,
                timeout: 0,
            })
                .then(res => {
                    Object.keys(res).length === 0 ? console.log(`\nUser ${user.name} was removed.`) : console.log(`\nFailed removing user ${user.name}.`)
                })
                .catch((error) => {
                    console.log(`\nFailed removing user ${user.name}.`)
                    // console.error(JSON.stringify(error))
                    // console.error(error.response.status); //handel it
                })
        })
    } catch (error) {
        console.error((error));
    }
}

exports.edithubcred = async (user) => {
    if (!isValidToken())
        login()
    try {
        fs.readFile('.memconfig', 'utf8', (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            let credentials = JSON.parse(data);
            httpRequest({
                method: "PUT",
                url: `${credentials.server}${ApiEndpoint.EDIT_HUB_CREDS}`,
                headers: { 'Authorization': 'Bearer ' + credentials.jwt },
                bodyParams: {
                    "hub_username": user.hubuser,
                    "hub_password": user.hubpass,
                },
                queryParams: null,
                timeout: 0,
            })
                .then(res => {
                    user.hubuser && console.log(`\nUser's hub name was updated.`)
                    user.hubpass && console.log(`\nUser's hub password was updated.`)
                })
                .catch((error) => {
                    console.error(`\nFailed updating hub credentials.`)
                })
        })
    } catch (error) {
        console.error((error));
    }
}