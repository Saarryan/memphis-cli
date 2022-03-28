const factoryHelp = `Factory Commands:
   ls                List of factories
   create            Create new factory  
   edit              Edit factory name and/or description
   del               Delete a factory
`

const stationHelp = `Station Commands:
   ls                List of stations
   create            Create new station  
   info              Specific station's info
   edit              Edit station name
   del               Delete a station
`

const userHelp =    `User Commands:
  ls                 List of users
  add                Add new user  
  del                Delete user
  edithubcred        Edit hub credentials
  `

const configrHelp = `Config Commands:
config               Login configuration

Use command: mem config --user <user> --password <password> --server <server>
`

exports.factoryHelp = factoryHelp;
exports.stationHelp = stationHelp;
exports.userHelp = userHelp;
exports.configrHelp = configrHelp;
