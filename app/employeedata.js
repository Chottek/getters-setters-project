const mysql = require('mysql');
const dbconf = require('./dbconfig.json');
const util = require('util');
const db = wrapDB(dbconf);

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

 exports.getEmployees = async () => { 
    return await db.query( 
        "SELECT id, emp_name, emp_address, ninum, start_salary" 
        + " FROM Employee");
 }

 