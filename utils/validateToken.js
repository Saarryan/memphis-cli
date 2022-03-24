const fs = require('fs');

module.exports = () => {
    try {
        const data = fs.readFileSync('.memconfig', 'utf8')
        const credentials = JSON.parse(data.toString())
        const d = new Date();
        return !(d.getTime() > credentials.expiration)
    } catch (error) {
        return false
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
    }



    // let credentials
    // 
    // // return true
    // // d.getTime() > credentials.expiration
    // fs.readFile('.memconfig', 'utf8', (err, data) => {
    //     if (err) {
    //         console.log(err)
    //         return false
    //     }
    //     credentials = JSON.parse(data);
    // })
    // console.log(credentials)
}
