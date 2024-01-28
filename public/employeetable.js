const table = document.querySelector('.custtable');

fetch('/employees')
  .then(response => response.json())
  .then(data => {
    data.forEach(employee => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${employee.employeeID}</td>
        <td>${employee.firstName} ${employee.lastName}</td>
        <td>${employee.phone}</td>
        <td>${employee.address}</td>
        <td>${employee.email}</td>
        <td>${employee.role}</td>
        <td>${employee.pay}</td>
        <td>
        <button onclick="deleteEmployee(${employee.employeeID})">Delete</button>
        <button onclick="editEmployee(${employee.employeeID}, '${employee.firstName}', '${employee.lastName}', '${employee.phone}', '${employee.address}', '${employee.email}', '${employee.role}', ${employee.pay})">Edit</button>
        </td>
        `;
      table.appendChild(row);
  });
});

function editEmployee(employeeID) {
    // fetch employee data from the server
    fetch(`/employees/${employeeID}`)
      .then(response => response.json())
      .then(employee => {
        // create a form and populate it with existing employee data
        const form = document.createElement('form');
        form.innerHTML = `
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" value="${employee.firstName}">
          <br>
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" value="${employee.lastName}">
          <br>
          <label for="phone">Phone:</label>
          <input type="text" id="phone" name="phone" value="${employee.phone}">
          <br>
          <label for="address">Address:</label>
          <input type="text" id="address" name="address" value="${employee.address}">
          <br>
          <label for="email">Email:</label>
          <input type="text" id="email" name="email" value="${employee.email}">
          <br>
          <label for="role">Role:</label>
          <input type="text" id="role" name="role" value="${employee.role}">
          <br>
          <label for="pay">Pay:</label>
          <input type="text" id="pay" name  ="pay" value="${employee.pay}">
          <br>
          <button type="submit">Save</button>
        `;
        
        // add event listener for form submission
        form.addEventListener('submit', event => {
          event.preventDefault();
            
          // create object with updated employee information
          const updatedEmployee = {
            employeeID: employeeID,
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            phone: form.phone.value,
            address: form.address.value,
            email: form.email.value,
            role: form.role.value,
            pay: form.pay.value,
          };
            
          // send PUT request to update the employee in the database
          fetch(`/employees/${employeeID}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedEmployee)
          })
          .then(data => {
            // display success message to the user
            console.log('Employee updated successfully!');
            alert('Employee updated successfully!');
            // reload the employee table
            location.reload();
          })
          .catch(error => {
            // display error message to the user
            alert('Error updating employee. Please try again later.');
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
        console.error('Error fetching employee data:', error);
        alert('Error fetching employee data. Please try again later.');
    });
}
  

function deleteEmployee(employeeID) {
  if (confirm("Are you sure you want to delete this employee?")) {
    fetch(`/employees/${employeeID}`, {
      method: 'DELETE'
    })
    .then(() => {
      alert("Employee deleted successfully!");
      location.reload();
    })
    .catch((error) => {
      console.error('Error deleting employee:', error);
      alert("Error deleting employee. Please try again later.");
    });
  }
};

