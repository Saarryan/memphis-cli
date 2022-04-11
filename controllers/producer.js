const ApiEndpoint = require("../apiEndpoints")
const httpRequest = require("../services/httpRequest")
const fs = require('fs');

exports.getProducers = async () => {
    try {
        const data = fs.readFileSync('.memconfig', 'utf8')
        if (data.length == 0) {
            return
        }
        const credentials = JSON.parse(data.toString())
        httpRequest({
            method: "GET",
            url: `${credentials.server}${ApiEndpoint.GET_ALL_PRODUCERS}`,
            headers: { 'Authorization': 'Bearer ' + credentials.jwt },
            bodyParams: null,
            queryParams: null,
            timeout: 0,
        })
            .then(res => {
                if (res.length === 0){
                    console.table([{ 
                            name: ' ',
                            type: ' ',
                            connection_id: ' ',
                            created_by_user: ' ',
                            creation_date: ' ',
                            station_name: ' ',
                            factory_name: ' ',
                            }]
                    )
                }
                else{
                    console.table(
                        res.map(producer => {
                            return {
                                "name": producer.name,
                                "description": producer.description,
                                "created_by_user": producer.created_by_user,
                                "creation_date": producer.creation_date,
                            };
                        }))
                }
                
            })
            .catch((error) => {
                console.log(error);
                console.log("Failed fetching all producers")
                // console.error(error); //handel it
            })
    } catch (error) {
        console.log("Failed fetching all producers")
        // console.error((error));
    }
}


exports.getProducersByStation = async (station, options) => {
    try {
        const data = fs.readFileSync('.memconfig', 'utf8')
        if (data.length == 0) {
            return
        }
        const credentials = JSON.parse(data.toString())
        httpRequest({
            method: "GET",
            url: `${credentials.server}${ApiEndpoint.GET_ALL_PRODUCERS_BY_STATION}${station}`,
            headers: { 'Authorization': 'Bearer ' + credentials.jwt },
            bodyParams: null,
            queryParams: null,
            timeout: 0,
        })
            .then(res => {
                console.table(
                    res.map(producer => {
                        return {
                            "name": producer.name,
                            "description": producer.description,
                            "created_by_user": producer.created_by_user,
                            "creation_date": producer.creation_date,
                        };
                    }))
            })
            .catch((error) => {
                console.log(`Failed fetching all producers of station ${station}.`)
                // console.error(error); //handel it
            })
    } catch (error) {
        console.log(`Failed fetching all producers of station ${station}.`)
        // console.error(error);
    }
}
