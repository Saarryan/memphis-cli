module.exports = {
    //User management
    LOGIN: '/api-gw/usermgmt/login',
    ADD_USER: '/api-gw/usermgmt/addUser',
    GET_ALL_USERS: '/api-gw/usermgmt/getAllUsers',
    REMOVE_USER: '/api-gw/usermgmt/removeUser',
    // EDIT_HUB_CREDS: '/api-gw/usermgmt/editHubCreds',

    //Factories:
    CREATE_FACTORY: '/api-gw/factories/createFactory',
    GET_ALL_FACTORIES: '/api-gw/factories/getAllFactories',
    REMOVE_FACTORY: '/api-gw/factories/removeFactory',
    EDIT_FACTORY: '/api-gw/factories/editFactory',

    //Stations
    GET_STATION_INFO: '/api-gw/stations/getStation',
    CREATE_STATION: '/api-gw/stations/createStation',
    REMOVE_STATION: '/api-gw/stations/removeStation',
    GET_ALL_STATIONS: '/api-gw/stations/getAllStations',

    //Producers
    GET_ALL_PRODUCERS: '/api-gw/producers/getAllProducers',
    GET_ALL_PRODUCERS_BY_STATION: '/api-gw/producers/getAllProducersByStation?station_name=',

    //Consumers
    GET_ALL_CONSUMERS: '/api-gw/consumers/getAllConsumers',
    GET_ALL_CONSUMERS_BY_STATION: '/api-gw/consumers/getAllConsumersByStation?station_name='
}