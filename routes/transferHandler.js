var express = require('express');
const getPrisoners = require("../dal/transfers");
const setTransfers = require("../dal/transfers");
const updateTransfers = require("../dal/transferHandler");
var router = express.Router();
const {status} = require('../dal/config')

router.post('/:transferId-:status', async function (req, res, next) {

    // Verify each field (Validation)

    function something(validationMsg) {
        return res.redirect('/transfersList' + "?msg=" + validationMsg)
    }

    console.log(req.body);
    if (req.params.transferId === '' || req.params.transferId === undefined || req.params.transferId === 1) {
        return something("Please Enter Correct Details");
    }


    await updateTransfers(req, (data, isError) => {
        console.log(data);

        if (isError) {
            return something(data);
        }

        return something("Successfully " + (req.params.status == 2 ? "Dis-Approved!" : "Approved!"));
    });

});

module.exports = router;