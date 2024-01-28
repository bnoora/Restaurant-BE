const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'dba',
    password: '123456',
    database: 'restaurantcs340',
    port: 4000,
});
  
// employee  
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/employee.html');
});

app.get('/employees/:id', (req, res) => {
  const { id } = req.params;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from db', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const sql = 'SELECT * FROM employees WHERE employeeID = ?';
    connection.query(sql, [id], (err, results) => {
      connection.release();
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      const employee = results[0];
      res.json(employee);
    });
  });
});


app.get('/employees', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {  
            console.error('Error getting connection from db', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const sql = 'SELECT employeeID, firstName, lastName, phone, email, address, role, pay FROM employees';
        connection.query(sql, (err, results) => {
            connection.release();
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
        res.json(results);
        });
    });
});


app.post('/add-employee', (req, res) => {
  const { firstName, lastName, phone, email, address, role, pay } = req.body;
  pool.getConnection((err, connection) => {
    if (err) {  
      console.error('Error getting connection from db', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const sql = 'INSERT INTO employees (firstName, lastName, phone, email, address, role, pay) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [firstName, lastName, phone, email, address, role, pay], (err, results) => {
      connection.release();
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.redirect('/employee.html');
    });
  });
});

app.delete('/employees/:id', (req, res) => {
  const { id } = req.params;
  pool.getConnection((err, connection) => {
    if (err) {  
      console.error('Error getting connection from db', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const sql = 'DELETE FROM employees WHERE employeeID = ?';
    connection.query(sql, [id], (err, results) => {
      connection.release();
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.sendStatus(204);
    });
  });
});

app.put('/employees/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, phone, email, address, role, pay } = req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from db', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const sql = 'UPDATE employees SET firstName=?, lastName=?, phone=?, email=?, address=?, role=?, pay=? WHERE employeeID=?';
    connection.query(sql, [firstName, lastName, phone, email, address, role, pay, id], (err, results) => {
      connection.release();
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      console.log('Query results:', results);
      res.sendStatus(204);
    });
  });
});

// customer
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/customer.html');
});

app.get('/customers/:id', (req, res) => {
  const { id } = req.params;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from db', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const sql = 'SELECT * FROM customers WHERE customerID = ?';
    connection.query(sql, [id], (err, results) => {
      connection.release();
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'customer not found' });
      }
      const employee = results[0];
      res.json(employee);
    });
  });
});


app.get('/customers', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {  
            console.error('Error getting connection from db', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const sql = 'SELECT customerID, firstName, lastName, phone, email, address FROM customers';
        connection.query(sql, (err, results) => {
            connection.release();
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
        res.json(results);
        });
    });
});


app.post('/add-customer', (req, res) => {
  const { firstName, lastName, phone, email, address} = req.body;
  pool.getConnection((err, connection) => {
    if (err) {  
      console.error('Error getting connection from db', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const sql = 'INSERT INTO customers (firstName, lastName, phone, email, address) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [firstName, lastName, phone, email, address], (err, results) => {
      connection.release();
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.redirect('/customer.html');
    });
  });
});

app.delete('/customers/:id', (req, res) => {
  const { id } = req.params;
  pool.getConnection((err, connection) => {
    if (err) {  
      console.error('Error getting connection from db', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const sql = 'DELETE FROM customers WHERE customerID = ?';
    connection.query(sql, [id], (err, results) => {
      connection.release();
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.sendStatus(204);
    });
  });
});

app.put('/customers/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, phone, email, address} = req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from db', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const sql = 'UPDATE customers SET firstName=?, lastName=?, phone=?, email=?, address=? WHERE customerID=?';
    connection.query(sql, [firstName, lastName, phone, email, address, id], (err, results) => {
      connection.release();
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      console.log('Query results:', results);
      res.sendStatus(204);
    });
  });
});


// Items
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/items.html');
});

app.get('/items/:id', (req, res) => {
  const { id } = req.params;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from db', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const sql = 'SELECT * FROM items WHERE itemID = ?';
    connection.query(sql, [id], (err, results) => {
      connection.release();
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      const employee = results[0];
      res.json(employee);
    });
  });
});


app.get('/items', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {  
            console.error('Error getting connection from db', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        const sql = 'SELECT itemID, name, price, restriction FROM items';
        connection.query(sql, (err, results) => {
            connection.release();
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
        res.json(results);
        });
    });
});


app.post('/add-item', (req, res) => {
  const { name, price, restriction} = req.body;
  pool.getConnection((err, connection) => {
    if (err) {  
      console.error('Error getting connection from db', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const sql = 'INSERT INTO items (name, price, restriction) VALUES (?, ?, ?)';
    connection.query(sql, [name, price, restriction], (err, results) => {
      connection.release();
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.redirect('/items.html');
    });
  });
});

app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  pool.getConnection((err, connection) => {
    if (err) {  
      console.error('Error getting connection from db', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const sql = 'DELETE FROM items WHERE itemID = ?';
    connection.query(sql, [id], (err, results) => {
      connection.release();
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.sendStatus(204);
    });
  });
});

app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, restriction} = req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from db', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const sql = 'UPDATE items SET name=?, price=?, restriction=? WHERE itemID=?';
    connection.query(sql, [name, price, restriction, id], (err, results) => {
      connection.release();
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      console.log('Query results:', results);
      res.sendStatus(204);
    });
  });
});

// Orders 
app.get('/orders/:id', (req, res) => {
  const { id } = req.params;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from db', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const sql = 'SELECT * FROM orders WHERE orderID = ?';
    connection.query(sql, [id], (err, results) => {
      connection.release();
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }
      const order = results[0];
      res.json(order);
    });
  });
});

app.get('/orders', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from db', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const sql = 'SELECT orderID, customerID, employeeID,total , DATE_FORMAT(date, "%Y-%m-%d") as date FROM orders';
    connection.query(sql, (err, results) => {
      connection.release();
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(results);
    });
  });
});

app.post('/add-order', (req, res) => {
  console.log(req.body);
  const { items, customer, employee, total } = req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from db', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const sql = 'INSERT INTO orders (customerID, employeeID, date, total) VALUES (?, ?, CURRENT_DATE(), ?)';
    connection.query(sql, [customer, employee, total], (err, results) => {
      if (err) {
        connection.release();
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      const orderID = results.insertId;
      const itemsSql = 'INSERT INTO orderItems (orderID, itemID, number) VALUES ?';
      const orderItemsValues = items.map(item => [orderID, item.itemID, item.itemCount]);
      connection.query(itemsSql, [orderItemsValues], (err, results) => {
        connection.release();
        if (err) {
          console.error('Error executing query:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        res.redirect('/order.html');
      });
    });
  });
});

app.delete('/orders/:id', (req, res) => {
  const { id } = req.params;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from db', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const sql = 'DELETE FROM orders WHERE orderID = ?';
    connection.query(sql, [id], (err, results) => {
      connection.release();
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.sendStatus(204);
    });
  });
});



// Orderitems
app.get('/orderitems/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from db', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const sql = 'SELECT * FROM orderitems WHERE orderID = ?';
    connection.query(sql, [orderId], (err, results) => {
      connection.release();
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(results);
    });
  });
});


//Search
app.get('/customersearch', (req, res) => {
  const { firstName, lastName } = req.query;
  const sql = 'SELECT * FROM customers WHERE firstName LIKE ? AND lastName LIKE ?';
  const values = [`%${firstName}%`, `%${lastName}%`];
  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});


app.get('/employeesearch', (req, res) => {
  const { firstName, lastName } = req.query;
  const sql = 'SELECT * FROM employees WHERE firstName LIKE ? AND lastName LIKE ?';
  const values = [`%${firstName}%`, `%${lastName}%`];
  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});




const port = 5205;
app.listen(port, () => {
  console.log('Server listening on port 5205');
});
