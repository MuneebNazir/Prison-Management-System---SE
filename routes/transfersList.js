var express = require('express');
//const getPrisoners = require("../dal/prisoners");
const getTransfers = require("../dal/transfersList");
var router = express.Router();
const {status} = require('../dal/config')

/* GET users listing. */
router.get('/', async function (req, res, next) {


    await getTransfers((data, isError) => {
        console.log(data);

        var lOT = isError ? [] : data.recordset.map(f => {
            f.TypeName = status[f.Status]
            return f;
        })
        // res.send(data);
        res.render('jailorTransferNotifications', {title: "List of Transfers", listOfTransfers: lOT})
    });

});

module.exports = router;
