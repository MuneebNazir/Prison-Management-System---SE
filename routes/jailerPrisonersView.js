var express = require('express');
const getPrisoners = require("../dal/Prisoners");
var router = express.Router();
const {dangerlevel} = require('../dal/config')

/* GET users listing. */
router.get('/', async function (req, res, next) {


    await getPrisoners((data, isError) => {
        console.log(data);

        var lOP = isError ? [] : data.recordset.map(f => {
            f.TypeName = dangerlevel[f.CellNo]
            return f;
        })
        // res.send(data);
        res.render('jailerPrisonerView', {title: "List of Prisoners", listOfPrisoners: lOP})
    });

});

module.exports = router;