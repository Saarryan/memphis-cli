exports.validateAvatar = avatar => {
    const avatars = [1, 2, 3, 4];
    return !isNaN(avatar) && avatars.includes(parseInt(avatar)) ? true : false
}

exports.validateUserType = type => {
    return type == "application" || type == "management" ? true : false
}

exports.validatePassword = password => {
    return password.length > 5 ? true : false
}