const ApiEndpoint = require("../apiEndpoints")
const httpRequest = require("../services/httpRequest")
const fs = require('fs');

exports.getConsumers = async () => {
    try {
        const data = fs.readFileSync('.memconfig', 'utf8')
        if (data.length == 0) {
            return
        }
        const credentials = JSON.parse(data.toString())
        httpRequest({
            method: "GET",
            url: `${credentials.server}${ApiEndpoint.GET_ALL_CONSUMERS}`,
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
                            created_by_user: ' ',
                            station_name: ' ',
                            factory_name: ' ',
                            creation_date: ' ',
                            }]
                    )
                }
                else{
                    console.table(
                        res.map(consumer => {
                            return {
                                "name": consumer.name,
                                "type": consumer.type,
                                "created_by_user": consumer.created_by_user,
                                "station_name": consumer.station_name,
                                "factory_name": consumer.factory_name,
                                "creation_date": consumer.creation_date,
                            };
                        }))
                }
                
            })
            .catch((error) => {
                console.log("Failed fetching all consumers")
                // console.error(error); //handel it
            })
    } catch (error) {
        console.log("Failed fetching all consumers")
        // console.error((error));
    }
}


exports.getConsumersByStation = async (station) => {
    try {
        const data = fs.readFileSync('.memconfig', 'utf8')
        if (data.length == 0) {
            return
        }
        const credentials = JSON.parse(data.toString())
        httpRequest({
            method: "GET",
            url: `${credentials.server}${ApiEndpoint.GET_ALL_CONSUMERS_BY_STATION}${station}`,
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
                            created_by_user: ' ',
                            station_name: ' ',
                            factory_name: ' ',
                            creation_date: ' ',
                            }]
                    )
                }
                else{
                    console.table(
                        res.map(consumer => {
                            return {
                                "name": consumer.name,
                                "type": consumer.type,
                                "created_by_user": consumer.created_by_user,
                                "station_name": consumer.station_name,
                                "factory_name": consumer.factory_name,
                                "creation_date": consumer.creation_date,
                            };
                        }))
                }
            })
            .catch((error) => {
                // console.log(error);
                if(error.errorObj.message === 'Station does not exist'){
                    console.log(error.errorObj.message);
                }
                else{
                    console.log(`Failed fetching all consumers of station ${station}.`)
                }
                // console.error(error); //handel it
            })
    } catch (error) {
        console.log(`Failed fetching all consumers of station ${station}.`)
        // console.error(error);
    }
}
