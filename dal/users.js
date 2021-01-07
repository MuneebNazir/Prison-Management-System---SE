const sql = require('mssql')
const {config} = require('./config')

module.exports = getUsers;

async function getUsers(callback) {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const result = await sql.query`SELECT * from Users`
        // console.dir(result)
        callback(result, false);
    } catch (err) {
        callback(err, true);
        // ... error checks
    }
}