const sql = require('mssql')

const {config} = require('./config')

module.exports = setComplaints;

var validationMsg = "Request Already Made!"

async function setComplaints(req, callback) {
    try {
        await sql.connect(config)

        var temp = await sql.query`Select * from [dbo].[Complaints] where [PrisonerID] = ${req.body.prisonerId} AND [Complaint] like '${req.body.prisonerId}'`


        if(temp.recordset.length > 0){
            return callback("Couldn't Process. Same Record Already Exists!",true);
        }
        if(req.body.complaintReason === '' || req.body.complaintReason === null || req.body.complaintReason === undefined) {
            var data = await sql.query`INSERT INTO [dbo].[Complaints]
           ([Complaint]
           ,[PrisonerID]
           ,[CourtOfficerID]
           ,[Status]
           ,[Reason])
     VALUES
           (${req.body.complaint},
           ${req.body.prisonerId},
           ${req.body.JailOfficerID},1,null)`
        }
        else{
            var data = await sql.query`INSERT INTO [dbo].[Complaints]
           ([Complaint]
           ,[PrisonerID]
           ,[CourtOfficerID]
           ,[Status]
           ,[Reason])
     VALUES
           (${req.body.complaint},
           ${req.body.prisonerId},
           ${req.body.JailOfficerID},1,
           ${req.body.complaintReason})`
        }
        callback(data, data.rowsAffected !== 1)

    } catch (err) {
        callback(err, true)
    }
}