// Wait for the page to load before running the JavaScript
document.addEventListener('DOMContentLoaded', function() {

    // Fetch the items from the server and populate the item select element
    fetch('/items')
    .then(response => response.json())
    .then(items => {
      const itemsContainer = document.getElementById('items-container');
      items.forEach(item => {
        const itemDiv = document.createElement('div');

        const itemLabel = document.createElement('label');
        itemLabel.htmlFor = `item-${item.id}`;
        itemLabel.textContent = item.name + ' ';
        itemDiv.appendChild(itemLabel);

        const itemCounter = document.createElement('input');
        itemCounter.type = 'number';
        itemCounter.id = `item-${item.itemID}`;
        itemCounter.name = `item-${item.itemID}`;
        itemCounter.min = 0;
        itemCounter.value = item.count;
        itemCounter.setAttribute('data-id', item.itemID);
        itemCounter.setAttribute('data-price', item.price);
        itemDiv.appendChild(itemCounter);

        itemsContainer.appendChild(itemDiv);
      });
    });


    // Fetch the customers from the server and populate the customer select element
    fetch('/customers')
      .then(response => response.json())
      .then(customers => {
        const customerSelect = document.getElementById('customer');
        customers.forEach(customer => {
          const option = document.createElement('option');
          option.value = customer.customerID;
          option.text = `${customer.firstName} ${customer.lastName}`;
          customerSelect.appendChild(option);
        });
      });
  
    // Fetch the employees from the server and populate the employee select element
    fetch('/employees')
      .then(response => response.json())
      .then(employees => {
        const employeeSelect = document.getElementById('employee');
        employees.forEach(employee => {
          const option = document.createElement('option');
          option.value = employee.employeeID;
          option.text = `${employee.firstName} ${employee.lastName}`;
          employeeSelect.appendChild(option);
        });
      });
  
    // Add an event listener to the form to handle submission
    const form = document.getElementById('order-form');
    form.addEventListener('submit', function (event) {
      // Prevent the form from submitting in the traditional way
      event.preventDefault();
  
      // Fetch the selected customer and employee values
      const customerValue = parseInt(document.getElementById('customer').value);
      const employeeValue = parseInt(document.getElementById('employee').value);
  
      // Get the item counters
      const itemsContainer = document.getElementById('items-container');
      const itemInputs = itemsContainer.querySelectorAll('input[type="number"]');
  
      // Create an array of items and their updated counts
      const updatedItems = Array.from(itemInputs).map(input => {
        const itemID = parseInt(input.id.split('-')[1]);
        const itemCount = parseInt(input.value);
        const itemPrice = parseFloat(input.dataset.price);
        return { itemID, itemCount, price: itemPrice };
      });
  
      // Calculate the total price of the order
      const totalPrice = updatedItems.reduce((total, currentItem) => {
        return total + currentItem.itemCount * currentItem.price;
      }, 0);
  
      // Do something with the selected values and updated item counts, such as sending them to the server using fetch()
      fetch('/add-order', {
        method: 'POST',
        body: JSON.stringify({ items: updatedItems, customer: customerValue, employee: employeeValue, total: totalPrice }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (!response.ok) {
            return response.text().then(text => {
              throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
            });
          }
          alert('Order submitted successfully!');
        })
        .catch(error => {
          console.error(`Error: ${error}`);
          alert('Error submitting order!');
        });      
    });
  
  });