const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
const employeedata = require('./employeedata.js')

router.get('/list-employees', async (req, res) => {
    res.render('list-employees', { employees: await employeedata.getEmployees() })
});

router.get('/list-employees/:substr', (req, res) => {
    res.render('list-employees',
        {
            namefilter: req.params.substr.toLowerCase(),
            employees: employeedata.getEmployees()
        });
});


router.get('/addemployee', async (req, res) => {
    res.render('newempform', { employees: await employeedata.getEmployees() });
});


router.post('/addemployee', async (req, res) => {
    var emp = req.body;
    let validityFlag = true;
    if (!hasValidInputLength(emp.emp_name, 50)) {
        res.locals.errormessage = "Name is too long (50 chars max)"
        console.error("ERROR on name")
        validityFlag = false;
    }

    if (!hasValidInputLength(emp.emp_address, 100)) {
        res.locals.errormessage = "Address is too long (100 chars max)"
        console.error("ERROR on address")
        validityFlag = false;
    }

    if (!hasValidInputLength(emp.ninum.replace(/\s/g, ""), 13)) {
        res.locals.errormessage = "NIN is not valid (13 chars max)"
        console.error("ERROR on NIN")
        validityFlag = false;
    }

    if (!isValidIban(emp.iban)) {
        res.locals.errormessage = "IBAN is not valid"
        console.error("ERROR on IBAN")
        validityFlag = false;
    }

    if (!validityFlag) {
        console.error("Validity flag is not valid :C")
        res.render('newempform', { employees: req.body });
    } else {
        console.log(req.body)
        let insertedKey = await employeedata.addEmployee(req.body)
        res.render('list-employees', { employees: await employeedata.getEmployees() });
    }
})

function hasValidInputLength(value, maxlength) {
    return value.length < maxlength;
}

function isValidIban(iban) {
    return hasValidInputLength(iban, 34) && isNaN(iban.charAt(0)) && isNaN(iban.charAt(1));
}


router.get('/list-employees-pay', async (req, res) => {
    res.render('list-employees-pay', { employees: await employeedata.getFinances(employeedata.getEmployees()) });
});

module.exports = router
