SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Create the Customers table
CREATE TABLE IF NOT EXISTS `Customers` (
`customerID` int NOT NULL AUTO_INCREMENT, 
`firstName` varchar(20) NOT NULL,  
`lastName` varchar(20) NOT NULL, 
`phone` varchar(20) NOT NULL, 
`email` varchar(20), 
`address` varchar(20), 
UNIQUE(`customerID`),
PRIMARY KEY (`customerID`)
);

-- Create the Items table
CREATE TABLE IF NOT EXISTS `Items` (
`itemID` int NOT NULL AUTO_INCREMENT, 
`name` varchar(20) NOT NULL, 
`price` float NOT NULL, 
`restriction` int NOT NULL, 
PRIMARY KEY (`itemID`), 
UNIQUE(`itemID`),
);

-- Create the Employees table
CREATE TABLE IF NOT EXISTS `Employees` (
`employeeID` int NOT NULL AUTO_INCREMENT, 
`firstName` varchar(20) NOT NULL, 
`lastName` varchar(20) NOT NULL, 
`phone` varchar(20) NOT NULL, 
`email` varchar(20) NOT NULL, 
`address` varchar(20) NOT NULL, 
`role` varchar(20) NOT NULL, 
`pay` float NOT NULL, 
UNIQUE(`employeeID`),
PRIMARY KEY (`employeeID`)
);

-- Create the Orders table
CREATE TABLE IF NOT EXISTS `Orders` (
`orderID` int NOT NULL AUTO_INCREMENT, 
`customerID` int NOT NULL, 
`employeeID` int NOT NULL, 
`date` date NOT NULL, 
`total` float NOT NULL, 
PRIMARY KEY (`orderID`),
UNIQUE(`orderID`),
FOREIGN KEY(`employeeID`) REFERENCES `Employees` (`employeeID`) ON DELETE CASCADE,
FOREIGN KEY(`customerID`) REFERENCES `Customers` (`customerID`) ON DELETE CASCADE
);

-- Create the Orderitems table
CREATE TABLE IF NOT EXISTS `Orderitems` (
`orderID`int NOT NULL, 
`itemID` int NOT NULL, 
`number` int NOT NULL, 
PRIMARY KEY (`orderID`, `itemID`),
FOREIGN KEY(`orderID`) REFERENCES `Orders` (`orderID`) ON DELETE CASCADE,
FOREIGN KEY(`itemID`) REFERENCES `Items` (`itemID`) ON DELETE CASCADE
);

-- Add data to tables 
INSERT INTO Customers (firstName, lastName, phone, address, email)
    VALUES ('John', 'Wick', 5489879874, '3 Babayaga Dr: houston: TX', 'johnwick12@gmail.com');

INSERT INTO Customers (firstName, lastName, phone, address, email)
    VALUES ('Luke', 'Skywalker', 5489876874, '6 Sabre St: suite 12: Houston: TX', 'mydadisntvader@yahoo.com');

INSERT INTO Customers (firstName, lastName, phone, address, email) 
    VALUES ('Peter', 'Parker', 5485879874, '56 Spider Dr: houston: TX,', 'fakewebs@gmail.com');

INSERT INTO Employees (firstName, lastName, phone, email, address, role, pay) 
    VALUES ('Bob', 'Belcher', '577777984', 'bobby24@gmailc.com', '5 Bobs Dr: houston: TX', 'Manager', 30 );

INSERT INTO Employees (firstName, lastName, phone, email, address, role, pay) 
    VALUES ('Linda', 'Belcher', '577777985', 'linda24@gmail.com', '5 Bobs Dr: houston: TX', 'Waiter', 25 );

INSERT INTO Employees (firstName, lastName, phone, email, address, role, pay) 
    VALUES ('Gene', 'Belcher', '577777986', 'extracharacter@gmail.com', '5 Bobs Dr: houston: TX', 'Waiter', 15 );

INSERT INTO Orders (customerID, employeeID, date, total) 
    VALUES (2, 1, 2023-2-7, 130.0);

INSERT INTO Orders (customerID, employeeID, date, total) 
    VALUES (2, 1, 2023-2-7, 15.99);

INSERT INTO Orders (customerID, employeeID, date, total) 
    VALUES (3, 3, 2023-2-8, 15.99);

INSERT INTO Orderitems (orderID, itemID, number)
    VALUES (1, 1, 20);

INSERT INTO Orderitems (orderID, itemID, number)
    VALUES (2, 2, 1);

INSERT INTO Orderitems (orderID, itemID, number)
    VALUES (3, 2, 1);

INSERT INTO Items (name, price, restriction)
    VALUES ('Fries', 6.5, 0);

INSERT INTO Items (name, price, restriction)
    VALUES ('Pepperoni Pizza', 15.99, 2);

INSERT INTO Items (name, price, restriction)
    VALUES ('Cheese Pizza', 12.99, 0);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;