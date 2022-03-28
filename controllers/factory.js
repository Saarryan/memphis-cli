const ApiEndpoint = require("../apiEndpoints")
const httpRequest = require("../services/httpRequest")
const isValidToken = require("../utils/validateToken")
const login = require("./login")
const fs = require('fs');

exports.getFactories = async () => {
    if (!isValidToken())
        login()
    try {
        const data = fs.readFileSync('.memconfig', 'utf8')
        if (data.length == 0) {
            return
        }
        const credentials = JSON.parse(data.toString())
        httpRequest({
            method: "GET",
            url: `${credentials.server}${ApiEndpoint.GET_ALL_FACTORIES}`,
            headers: { 'Authorization': 'Bearer ' + credentials.jwt },
            bodyParams: null,
            queryParams: null,
            timeout: 0,
        })
            .then(res => {
                console.table(
                    res.map(factory => {
                        return {
                            "name": factory.name,
                            "description": factory.description,
                            "created_by_user": factory.created_by_user,
                            "creation_date": factory.creation_date,
                        };
                    }))
            })
            .catch((error) => {
                console.error(error); //handel it
            })
    } catch (error) {
        console.error((error));
    }
}

exports.createFactory = async (factory) => {
    if (!isValidToken())
        login()
    try {
        const data = fs.readFileSync('.memconfig', 'utf8')
        if (data.length == 0) {
            return
        }
        const credentials = JSON.parse(data.toString())
        httpRequest({
            method: "POST",
            url: `${credentials.server}${ApiEndpoint.CREATE_FACTORY}`,
            headers: { 'Authorization': 'Bearer ' + credentials.jwt },
            bodyParams: {
                "name": factory.name,
                "description": factory.desc
            },
            queryParams: null,
            timeout: 0,
        })
            .then(res => {
                console.log(`\nFactory ${res.name} was created.`);
            })
            .catch((error) => {
                console.error(error); //handel it
            })
    } catch (error) {
        console.error(error);
    }
}

// exports.editFactory = async (name, options) => {
//     if (!isValidToken())
//         login()
//     try {
//         fs.readFile('.memconfig', 'utf8', (err, data) => {
//             if (err) {
//                 console.error(err)
//                 return
//             }
//             let credentials = JSON.parse(data);
//             httpRequest({
//                 method: "PUT",
//                 url: `${credentials.server}${ApiEndpoint.EDIT_FACTORY}`,
//                 headers: { 'Authorization': 'Bearer ' + credentials.jwt },
//                 bodyParams: {
//                     "application_name": factory.name,
// {
//     "factory_name": "fdfd",
//     "factory_new_name": "idan test",
// 	"factory_new_description": "fdfdfdfd"
// }
//                 },
//                 queryParams: null,
//                 timeout: 0,
//             })
//                 .then(res => {
//                     //fix console.
//                     Object.keys(res).length === 0 ? console.log(`\nFactory ${factory.name} was removed.`) : console.log(`\nFailed removing factory ${factory.name}.`)
//                     console.log(res)
//                     // console.log(`\nFactory ${res.name} was deleted.`);
//                 })
//                 .catch((error) => {
//                     console.log(`\nFailed removing factory ${factory.name}.`)
//                 })
//         })
//     // try {
//     //     console.log(`\nFactory ${name} was edited. \nDetails:`);
//     //     options.name && console.log(`  name: ${options.name}`);
//     //     options.desc && console.log(`  description: ${options.desc}`);
//     } catch (error) {
//         console.error(error);
//     }
// }

exports.removenFactory = async (factory) => {
    if (!isValidToken())
        login()
    try {
        const data = fs.readFileSync('.memconfig', 'utf8')
        if (data.length == 0) {
            return
        }
        const credentials = JSON.parse(data.toString())
        httpRequest({
            method: "DELETE",
            url: `${credentials.server}${ApiEndpoint.REMOVE_FACTORY}`,
            headers: { 'Authorization': 'Bearer ' + credentials.jwt },
            bodyParams: {
                "factory_name": factory.name,
            },
            queryParams: null,
            timeout: 0,
        })
            .then(res => {
                //fix console.
                Object.keys(res).length === 0 ? console.log(`\nFactory ${factory.name} was removed.`) : console.log(`\nFailed removing factory ${factory.name}.`)
                console.log(res)
                // console.log(`\nFactory ${res.name} was deleted.`);
            })
            .catch((error) => {
                console.log(`\nFailed removing factory ${factory.name}.`)
            })
    } catch (error) {
        console.error(error);
    }
}