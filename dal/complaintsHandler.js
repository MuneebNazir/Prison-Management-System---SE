const sql = require('mssql')

const {config} = require('./config')

module.exports = updateComplaints;

var validationMsg = "Request Already Made!"

async function updateComplaints(req, callback) {
    try {
        await sql.connect(config)

        /*var temp = await sql.query`Select Top(1) * from [dbo].[Transfers] where [PrisonerID] = ${req.body.prisonerId}`


        if(temp.recordset.length > 0){
            return callback("Couldn't Process. Record Already Exists!",true);
        }*/

        var data = await sql.query`UPDATE Complaints 
        SET Status=${req.params.status}
        WHERE ID = ${req.params.complaintId}`

        callback(data, data.rowsAffected < 1)

    } catch (err) {
        callback(err, true)
    }
}
