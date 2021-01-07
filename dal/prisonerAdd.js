const sql = require('mssql')

const {config} = require('./config')

module.exports = addPrisoner;

var validationMsg = "Request Already Made!"


async function addPrisoner(req, callback) {
    try {
        await sql.connect(config)

        var temp = await sql.query`Select Count(*) as total from [dbo].[Prisoner] where [CellNo] = ${req.body.cellNumber}`
        var temp1 = await sql.query`Select Capacity from [dbo].[Cells] where [ID] = ${req.body.cellNumber}`
        var temp2 = await sql.query`Select Name, CNIC from [dbo].[Prisoner] where [Name] = ${req.body.cellNumber}
                                                                    AND [CNIC] like '${req.body.prisonerCnic}'`

        if(temp2.recordset.Name === req.body.prisonerName && temp2.recordset.CNIC === req.body.prisonerCnic){
            return callback("Couldn't Process. Same Prisoner Already Exists!",true);
        }
        if(temp.total >= temp1.Capacity){
            return callback("Couldn't Process. Cell Capacity Full, Add different Cell No!",true);
        }

        if(req.body.prisonerCnic.length !== 13){
            return callback("Couldn't Process. Enter a 13 digit Valid CNIC!",true);
        }

        if((req.body.prisonerName === '' || req.body.prisonerName === undefined) || (req.body.prisonerCnic === '') || (req.body.prisonerAddress === '' || req.body.prisonerAddress === undefined) ||
            (req.body.cellNumber === '' || req.body.cellNumber === undefined)){
            return callback("Couldn't Process. Enter Valid Details!",true);
        }
        else{
            var data = await sql.query`INSERT INTO [dbo].[Prisoner]
           ([Name]
           ,[CNIC]
           ,[Address]
           ,[CellNo])
     VALUES
           (${req.body.prisonerName},
           ${req.body.prisonerCnic},
           ${req.body.prisonerAddress},
           ${req.body.cellNumber})`
        }



        callback("Successfully added", data.rowsAffected !== 1)

    } catch (err) {
        callback(err, true)
    }
}