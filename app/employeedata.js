const mysql = require('mysql');
const dbconf = require('./dbconf.json');
const util = require('util');
const e = require('express');
const db = wrapDB(dbconf);
const TAX_RATE_PERCENTAGE = 25;

//wraps mysql callback-based async function in Promise objects
function wrapDB (dbconfig) { 
    const pool = mysql.createPool(dbconfig) 
    return { 
        query(sql, args) { 
            console.log(" in query in wrapper") 
            return util.promisify( pool.query ) 
            .call(pool, sql, args) 
        }, 
        release () { 
            return util.promisify( pool.releaseConnection ) 
            .call( pool ) 
        } 
    }
 }

 /**
  * Gets Employee that has highest sales using reduce on objects in array
  * @param {*} salesemps Employee objects that contains sales field
  * @returns Employee that has highest sales
  */
 exports.getHighestSalesEmp = (salesemps) => {
    const max = salesemps.reduce(function(prev, current) {
        return (prev.sales > current.sales) ? prev : current
    })
    return max;
 }



/**
 * Iterates over emploees got from database, sets the gross pay value for each of them
 * @returns Array of Employees with additional (grosspay) field
 */
 exports.getFinances = async () => {
    let emps = await db.query( 
        "SELECT id, emp_name, emp_address, ninum, start_salary, department" 
        + " FROM Employee");

     emps.forEach(e => {
         e.grosspay = calcGrossPay(e.start_salary);
     });
     return emps;
 }


/**
 * Calculates gross pay from Employee pay
 * @param {*} payvalue Employee raw pay
 * @returns Value of gross pay (mixed with tax rate percentage constant)
 */
function calcGrossPay(payvalue){
    return payvalue - ((TAX_RATE_PERCENTAGE/100) * payvalue); 
}

 /**
  * Gets employess based on database query
  * @returns Async wrapped query of getting objects of Employee table from database
  */
 exports.getEmployees = async () => { 
    return await db.query( 
        "SELECT id, emp_name, emp_address, ninum, start_salary, department" 
        + " FROM Employee");
 }


 /**
  * Inputs thing into database with checking if values are correct
  * @param {*} newEmployee - employee object containing data from form
  * @returns Async wrapped query of inserting object of newEmployee into database
  */
 exports.addEmployee = async (newEmployee) => {
     console.log(newEmployee);
     return await db.query('INSERT INTO Employee SET ?', newEmployee);
 }

 /**
  * Adds things to SalesEmployee
  * @param {*} salesEmployee Object containing employee_id, sales and commissionrate
  * @returns query of inserting into database
  */
 exports.addSales = async (salesEmployee) => {
    return await db.query('INSERT INTO SalesEmployee SET ?', salesEmployee);
 }


