var express = require('express');
//const getPrisoners = require("../dal/Prisoners");
const getTransfers = require("../dal/transfersList");
const getComplaints = require("../dal/complaintsList");
var router = express.Router();
const {complaintStatus} = require('../dal/config')

/* GET users listing. */
router.get('/', async function (req, res, next) {


    await getComplaints((data, isError) => {
        console.log(data);

        var lOC = isError ? [] : data.recordset.map(f => {
            f.TypeName = complaintStatus[f.Status]
            return f;
        })
        // res.send(data);
        res.render('jailorComplaintsNotifications', {title: "List of Complaints", listOfComplaints: lOC})
    });

});

module.exports = router;