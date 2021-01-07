const sql = require('mssql')
const {config} = require('./config')

module.exports = getTransfers;

async function getTransfers(callback) {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(config)
        const result = await sql.query`SELECT * from Transfers`
        // console.dir(result)
        callback(result, false);
    } catch (err) {
        callback(err, true);
        // ... error checks
    }
}