const ApiEndpoint = require("../apiEndpoints")
const httpRequest = require("../services/httpRequest")
const fs = require('fs');

module.exports = async () => {
    fs.readFile('.memconfig', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        let credentials = JSON.parse(data);
        httpRequest({
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
                fs.writeFile('.memconfig', JSON.stringify(credentials), function (err) {
                    if (err) {
                        console.log('There has been an error saving your configuration data.');
                        console.log(err.message);
                        return;
                    }
                });
            })
            .catch((error) => {
                console.error(error);
                // console.error(error);
            })
    })



}