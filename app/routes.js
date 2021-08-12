const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
const employeedata = require('./employeedata.js')

router.get('/list-employees', async (req, res) => { 
    res.render('list-employees', { employees: await employeedata.getEmployees() } ) 
});


router.get('/list-employees/:substr', (req, res) => {
    res.render('list-employees', 
    { 
      namefilter: req.params.substr.toLowerCase(), 
      employees: employeedata.getEmployees() 
   }); 
});


router.get('/addemployees', async (req, res) => { 
    res.render('newempform', { employees: await employeedata.getEmployees() } ); 
    });

router.post('/addemployees', async (req, res) => { 
    var emp = req.body;
    let validityFlag = true;

    
    if(hasValidInputLength(emp.emp_name, 50)){
        
        return;
    }


    validityFlag = hasValidInputLength(emp.emp_address, 100)
    validityFlag = isValidIban(emp.ninum);

    if(!validityFlag){
        
    }

    // validate here 
    let insertedKey = await employeedata.addEmployee(req.body)
    res.render('list-employees', { employees: await employeedata.getEmployees()} );
})

function hasValidInputLength(value, maxlength){
    return value.length > maxlength;
}

function isValidIban(iban){
    return hasValidInputLength(iban, 34) && iban.charAt(0).isNaN() && iban.charAt(1).isNan();
}

module.exports = router
