var express = require('express');
const addPrisoner = require("../dal/prisonerAdd");

var router = express.Router();
const {dangerlevel} = require('../dal/config')

router.post('/', async function (req, res, next) {

    // Verify each field (Validation)

    function something(validationMsg) {
        return res.redirect('/addPrisoner' + "?msg=" + validationMsg)
    }

    console.log(req.body);
    if ((req.body.prisonerName === '' || req.body.prisonerName === undefined) || (req.body.prisonerCnic === '') || (req.body.prisonerAddress === '' || req.body.prisonerAddress === undefined) ||
        (req.body.cellNumber === '' || req.body.cellNumber === undefined)) {
        return something("Please Enter Correct Details");
    }


    await addPrisoner(req, (data, isError) => {
        console.log(data);

        if (isError) {
            return something(data);
        }

        return something("Something Wrong, Enter Valid Details");
    });

});

module.exports = router;