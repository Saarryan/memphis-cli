const applicationHelp = `Application Commands:
   ls                List of applications
   create            Create new application  
   edit              Edit application name and/or description
   del               Delete a application
`

const factoryHelp = `Factory Commands:
   ls                List of factories
   create            Create new factory  
   edit              Edit factory name
   del               Delete a factory
`

const userHelp = `User Commands:
  ls                List of users
  create            Create new user  
  edit              Edit user ... 
  del               Delete user
  regeneratepass    Regenerate new password

  `

exports.applicationHelp = applicationHelp;
exports.factoryHelp = factoryHelp;
exports.userHelp = userHelp;
