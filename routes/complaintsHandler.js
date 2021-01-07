var express = require('express');
const getPrisoners = require("../dal/transfers");
const setTransfers = require("../dal/transfers");
const updateTransfers = require("../dal/transferHandler");
const updateComplaints = require("../dal/complaintsHandler");
var router = express.Router();
const {complaintStatus} = require('../dal/config')

router.post('/:complaintId-:status', async function (req, res, next) {

    // Verify each field (Validation)

    function something(validationMsg) {
        return res.redirect('/complaintsList' + "?msg=" + validationMsg)
    }

    console.log(req.body);
    if (req.params.complaintId === '' || req.params.complaintId === undefined || req.params.complaintId === 1) {
        return something("Please Enter Correct Details");
    }


    await updateComplaints(req, (data, isError) => {
        console.log(data);

        if (isError) {
            return something(data);
        }

        return something("Successfully " + (req.params.status == 2 ? "Approved!" : "Rejected!"));
    });

});

module.exports = router;