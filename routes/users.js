var express = require('express');
const getUsers = require("../dal/users");
var router = express.Router();
const {types} = require('../dal/config')

/* GET users listing. */
router.get('/', async function (req, res, next) {


    await getUsers((data, isError) => {
        console.log(data);

        var lOU = isError ? [] : data.recordset.map(f => {
            f.TypeName = types[f.Type]
            return f;
        })
        // res.send(data);
        res.render('users', {title: "Application Users", listOfUsers: lOU})
    });

});

module.exports = router;
