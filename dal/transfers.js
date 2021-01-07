const sql = require('mssql')

const {config} = require('./config')

module.exports = setTransfers;

var validationMsg = "Request Already Made!"

async function setTransfers(req, callback) {
    try {
        await sql.connect(config)

        var temp = await sql.query`Select Top(1) * from [dbo].[Transfers] where [PrisonerID] = ${req.body.prisonerId}`


        if(temp.recordset.length > 0){
            return callback("Couldn't Process. Record Already Exists!",true);
        }
        if((req.body.reqReason === '' || req.body.reqReason === undefined || req.body.reqReason === null) &&
            (req.body.reqDescription === '' || req.body.reqDescription === undefined || req.body.reqDescription === null)){
            var data = await sql.query`INSERT INTO [dbo].[Transfers]
           ([PrisonerID]
           ,[JailOfficerID]
           ,[NewPrisonName]
           ,[TransferDate]
           ,[CellNo]
           ,[Status]
           ,[RequestReason]
           ,[ResponseReason])
     VALUES (${req.body.prisonerId}, 
              ${req.body.officerId},
              ${req.body.newJailName},
              ${req.body.transferDate},
              ${req.body.cellNo},
              1, null, null)`
        }
        else if((req.body.reqReason !== '' || req.body.reqReason !== undefined ) &&
            (req.body.reqDescription === '' || req.body.reqDescription === undefined || req.body.reqDescription === null)){
            var data = await sql.query`INSERT INTO [dbo].[Transfers]
           ([PrisonerID]
           ,[JailOfficerID]
           ,[NewPrisonName]
           ,[TransferDate]
           ,[CellNo]
           ,[Status]
           ,[RequestReason]
           ,[ResponseReason])
     VALUES (${req.body.prisonerId}, 
              ${req.body.officerId},
              ${req.body.newJailName},
              ${req.body.transferDate},
              ${req.body.cellNo},
              1, 
              ${req.body.reqReason}, null)`
        }
        else if((req.body.reqReason === '' || req.body.reqReason === undefined || req.body.reqReason === null) &&
            (req.body.reqDescription !== '' || req.body.reqDescription !== undefined)){
            var data = await sql.query`INSERT INTO [dbo].[Transfers]
           ([PrisonerID]
           ,[JailOfficerID]
           ,[NewPrisonName]
           ,[TransferDate]
           ,[CellNo]
           ,[Status]
           ,[RequestReason]
           ,[ResponseReason])
     VALUES (${req.body.prisonerId}, 
              ${req.body.officerId},
              ${req.body.newJailName},
              ${req.body.transferDate},
              ${req.body.cellNo},
              1, null, 
              ${req.body.reqDescription})`
        }
        else{
            var data = await sql.query`INSERT INTO [dbo].[Transfers]
           ([PrisonerID]
           ,[JailOfficerID]
           ,[NewPrisonName]
           ,[TransferDate]
           ,[CellNo]
           ,[Status]
           ,[RequestReason]
           ,[ResponseReason])
     VALUES (${req.body.prisonerId}, 
              ${req.body.officerId},
              ${req.body.newJailName},
              ${req.body.transferDate},
              ${req.body.cellNo},
              1, 
              ${req.body.reqReason}, 
              ${req.body.reqDescription})`
        }
        callback(data, data.rowsAffected !== 1)

    } catch (err) {
        callback(err, true)
    }
}
