const table = document.querySelector('.custtable');


fetch('/customers')
  .then(response => response.json())
  .then(data => {
    data.forEach(customer => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${customer.customerID}</td>
        <td>${customer.firstName} ${customer.lastName}</td>
        <td>${customer.phone}</td>
        <td>${customer.email}</td>
        <td>${customer.address}</td>
        <td>
        <button onclick="deleteCustomer(${customer.customerID})">Delete</button>
        <button onclick="editcustomer(${customer.customerID}, '${customer.firstName}', '${customer.lastName}', '${customer.phone}', '${customer.email}', '${customer.address}')">Edit</button>
        </td>
        `;
      table.appendChild(row);
  });
});

function editcustomer(customerID) {
    // fetch customer data from server
    fetch(`/customers/${customerID}`)
      .then(response => response.json())
      .then(customer => {
        // create a form and populate it with existing customer data
        const form = document.createElement('form');
        form.innerHTML = `
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" value="${customer.firstName}">
          <br>
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" value="${customer.lastName}">
          <br>
          <label for="phone">Phone:</label>
          <input type="text" id="phone" name="phone" value="${customer.phone}">
          <br>
          <label for="email">Email:</label>
          <input type="text" id="email" name="email" value="${customer.email}">
          <br>
          <label for="address">Address:</label>
          <input type="text" id="address" name="address" value="${customer.address}">
          <br>
          <button type="submit">Save</button>
        `;
        // add event listener for form submission
        form.addEventListener('submit', event => {
          event.preventDefault();
            
          // create object with updated customer information
          const updatedCustomer = {
            customerID: customerID,
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            phone: form.phone.value,
            email: form.email.value,
            address: form.address.value,
          };
            
          // send put request to update the customer in the database
          fetch(`/customers/${customerID}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedCustomer)
          })
          .then(data => {
            // display success message to the user
            console.log('customer updated successfully!');
            alert('customer updated successfully!');
            // reload the customer table
            location.reload();
          })
          .catch(error => {
            // display error message to the user
            alert('Error updating customer. Please try again later.');
          });
        });
        
        // style the form to appear in the middle of the screen
        form.style.position = 'absolute';
        form.style.top = '50%';
        form.style.left = '50%';
        form.style.transform = 'translate(-50%, -50%)';
        form.style.border = '2px solid black';
        form.style.padding = '20px';
        form.style.backgroundColor = 'white';
        
        // add the form to the page
        document.body.appendChild(form);
      })
      .catch(error => {
        console.error('Error fetching customer data:', error);
        alert('Error fetching customer data. Please try again later.');
    });
}
  

function deleteCustomer(customerID) {
  if (confirm("Are you sure you want to delete this customer?")) {
    fetch(`/customers/${customerID}`, {
      method: 'DELETE'
    })
    .then(() => {
      alert("customer deleted successfully!");
      location.reload();
    })
    .catch((error) => {
      console.error('Error deleting customer:', error);
      alert("Error deleting customer. Please try again later.");
    });
  }
};

