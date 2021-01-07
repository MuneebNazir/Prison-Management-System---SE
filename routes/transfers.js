var express = require('express');
const getPrisoners = require("../dal/transfers");
const setTransfers = require("../dal/transfers");
var router = express.Router();
const {status} = require('../dal/config')

router.post('/', async function (req, res, next) {

    // Verify each field (Validation)

    function something(validationMsg) {
        return res.redirect(req.baseUrl + "?msg=" + validationMsg)
    }

    console.log(req.body);
    if (req.body.prisonerId === '' || req.body.prisonerId === undefined || req.body.prisonerId === null) {
        return something("Please Enter Correct Details");
    }


    await setTransfers(req, (data, isError) => {
        console.log(data);

        if (isError) {
            return something("Successfully Entered the Request!");
        }

        return something("Something Wrong, Enter Valid Details");
    });

});

module.exports = router;