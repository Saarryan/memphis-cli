const fs = require('fs');

module.exports = () => {
    try {
        const data = fs.readFileSync('.memconfig', 'utf8')
        if (data.length == 0) {
            return false
        }
        const credentials = JSON.parse(data.toString())
        const d = new Date();
        return !(d.getTime() > credentials.expiration)
    } catch (error) {
        return false
    }
}
