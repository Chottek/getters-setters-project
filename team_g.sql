USE employee_getters;

CREATE TABLE Employee( 
   id SMALLINT PRIMARY KEY AUTO_INCREMENT, 
   emp_name VARCHAR(50) NOT NULL,
   emp_address VARCHAR(100) NOT NULL,
   ninum VARCHAR(13) NOT NULL,
   iban VARCHAR(34) NOT NULL,
   start_salary DECIMAL(11,2)
);

INSERT INTO Employee (emp_name, emp_address, ninum, iban, start_salary)
VALUES ('John Smith', '12 Kainos Lane', 'AB 12 34 56 7', '12345678', 20000), 
('Bill Bob', '64 Zoo Lane', 'AA 12 12 12 3', '98763112', 22000),
('Helen ', '12 Hello Street', 'AB 56 39 01 2', '11111111', 21000);