const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
const employeedata = require('./employeedata.js')

router.get('/list-employees', async (req, res) => { 
    res.render('list-employees', { employees: await employeedata.getEmployees() } ) 
});

router.get('/addemployees', async (req, res) => { 
    res.render('newempform', { employees: await employeedata.getEmployees() } ); 
    });

router.post('/addemployees', async (req, res) => { 
    var emp = req.body 
    // validate here 
    let insertedKey = await employeedata.addEmployee(req.body)
    res.render('list-employees', { employees: await employeedata.getEmployees()} );
})

module.exports = router
