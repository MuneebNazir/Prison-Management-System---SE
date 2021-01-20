var express = require('express');
const getPrisoners = require("../dal/prisoners");
const getCrimeHistory = require("../dal/crimeHistory");
var router = express.Router();
const {dangerlevel} = require('../dal/config')

/* GET users listing. */
router.get('/', async function (req, res, next) {


    await getCrimeHistory((data, isError) => {
        console.log(data);

        var lOCrimes = isError ? [] : data.recordset.map(f => {
            f.TypeName = dangerlevel[f.DangerLevel]
            return f;
        })
        // res.send(data);
        res.render('crimeHistory', {title: "Crime History", listOfCrimes: lOCrimes})
    });

});

module.exports = router;
