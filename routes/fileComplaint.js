var express = require('express');
const getPrisoners = require("../dal/transfers");
const setTransfers = require("../dal/transfers");
const setComplaints = require("../dal/fileComplaint");
var router = express.Router();
const {status} = require('../dal/config')

router.post('/', async function (req, res, next) {

    // Verify each field (Validation)

    function something(validationMsg) {
        return res.redirect(req.baseUrl + "?msg=" + validationMsg)
    }

    console.log(req.body);
    if (req.body.prisonerId === '' || req.body.prisonerId === undefined || req.body.prisonerId === null) {
        return something("Please Enter Correct Data");
    }


    await setComplaints(req, (data, isError) => {
        console.log(data);

        if (isError) {
            return something("Record Entered Successfully");
        }

        return something("Something Wrong Happened, Enter Again!");
    });

});

module.exports = router;