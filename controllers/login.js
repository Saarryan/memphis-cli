const ApiEndpoint = require("../apiEndpoints")
const httpRequest = require("../services/httpRequest")
const fs = require('fs');

module.exports = async () => {
    const data = fs.readFileSync('.memconfig', 'utf8')
    if (data.length == 0) {
        console.log("Please login.\nUse command: mem config --user <user> --password <password> --server <server>")
        return false
    }
    const credentials = JSON.parse(data.toString())
    return httpRequest({
        method: "POST",
        url: `${credentials.server}${ApiEndpoint.LOGIN}`,
        headers: null,
        bodyParams: {
            "username": credentials.user,
            "password": credentials.password,
        },
        queryParams: null,
        timeout: 0,
    })
        .then(res => {
            const d = new Date();
            credentials.jwt = res.jwt
            credentials.expiration = d.getTime() + res.expires_in - 100000
            fs.writeFileSync('.memconfig', JSON.stringify(credentials));
            return true
        })
        .catch((error) => {
            return false
            console.error(error);
            // console.error(error);
        })
}