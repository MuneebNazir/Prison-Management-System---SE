const sql = require('mssql')

const {config} = require('./config')

module.exports = setCrimeHistory;

var validationMsg = "Request Already Made!"

async function setCrimeHistory(req, callback) {
    try {
        await sql.connect(config)

        var temp = await sql.query`Select Top(1) * from [dbo].[CrimesHistory] where [PrisonerID] = ${req.body.prisonerId}
                                                                                AND [DateCommitted] = ${req.body.crimeDate}
                                                                                AND [Crime] = ${req.body.crime}`


        if(temp.recordset.length > 0){
            return callback("Couldn't Process. Record Already Exists!",true);
        }
        if(req.body.crimeDetails === '' || req.body.crimeDetails === undefined || req.body.crimeDetails === null) {
            var data = await sql.query`INSERT INTO [dbo].[CrimesHistory]
           ([DangerLevel]
           ,[PrisonerID]
           ,[DateCommitted]
           ,[Crime]
           ,[CrimeDetails])
     VALUES
           (${req.body.dangerLevel}, 
           ${req.body.prisonerId},
           ${req.body.crimeDate},
           ${req.body.crime},
           null)`
        }
        else{
            var data = await sql.query`INSERT INTO [dbo].[CrimesHistory]
           ([DangerLevel]
           ,[PrisonerID]
           ,[DateCommitted]
           ,[Crime]
           ,[CrimeDetails])
     VALUES
           (${req.body.dangerLevel}, 
           ${req.body.prisonerId},
           ${req.body.crimeDate},
           ${req.body.crime},
           ${req.body.crimeDetails})`
        }

        callback(data, data.rowsAffected !== 1)

    } catch (err) {
        callback(err, true)
    }
}
