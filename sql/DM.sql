-- These are all sameple data cant make queries without backend web code! 

-----------Selects--------------

-- Returns all from a customer with ID
SELECT * FROM customers WHERE customerID = ?;

-- Returns customers with their data
SELECT customerID, firstName, lastName, phone, email, address FROM customers

-- Returns employee with ID
SELECT * FROM employees WHERE employeeID = ?;

-- Returns all variables of all employees
'SELECT employeeID, firstName, lastName, phone, email, address, role, pay FROM employees;

-- Returns item with id:  
SELECT * FROM items WHERE itemID = ?;

-- Returns all items 
SELECT itemID, name, price, restriction FROM items;

-- Select order with id 
SELECT * FROM orders WHERE orderID = ?;

-- returns all order items with orderid 
SELECT * FROM orderitems WHERE orderID = ?;

-- returns customer with 1st and last name likeness
SELECT * FROM customers WHERE firstName LIKE ? AND lastName LIKE ?;

-- returns employee with 1st and last name likeness
SELECT * FROM employees WHERE firstName LIKE ? AND lastName LIKE ?


-----------Deletes--------------

-- Delete employee by id
DELETE FROM employees WHERE employeeID = ?;

-- Delete Customers by id
DELETE FROM customers WHERE customerID = ?;

-- Delete item by id 
DELETE FROM items WHERE itemID = ?;

-- Delete order by id 
DELETE FROM orders WHERE orderID = ?;



-----------UPDATES--------------


-- update Customers 
UPDATE customers SET firstName=?, lastName=?, phone=?, email=?, address=? WHERE customerID=?;

-- update employee 
UPDATE employees SET firstName=?, lastName=?, phone=?, email=?, address=?, role=?, pay=? WHERE employeeID=?;

-- update item 
UPDATE items SET name=?, price=?, restriction=? WHERE itemID=?;



-----------Inserts--------------
INSERT INTO customers (firstName, lastName, phone, email, address) VALUES (?, ?, ?, ?, ?)

INSERT INTO employees (firstName, lastName, phone, email, address, role, pay) VALUES (?, ?, ?, ?, ?, ?, ?)

INSERT INTO orders (customerID, employeeID, date, total) VALUES (?, ?, CURRENT_DATE(), ?);

INSERT INTO orderItems (orderID, itemID, number) VALUES ?;

INSERT INTO items (name, price, restriction) VALUES (?, ?, ?)