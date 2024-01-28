// reference to the search form and table element
const employeeSearchForm = document.getElementById('employee-search-form');
const etable = document.getElementById('employee-results-table');

// Attach event listener to the search form
employeeSearchForm.addEventListener('submit', event => {
  // Prevent the form from submitting normally
  event.preventDefault();

  // Get the search query from the form
  const firstName = employeeSearchForm.elements['firstname'].value;
  const lastName = employeeSearchForm.elements['lastname'].value;

  // Make a request to the server to search for employees with the given name
  fetch(`/employeesearch?firstName=${firstName}&lastName=${lastName}`)
    .then(response => response.json())
    .then(employees => {

      if (employees.length === 0) {
        const row = etable.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 5;
        cell.textContent = 'No results found.';
      } else {
        // Otherwise add each employee to the table
        employees.forEach(employee => {
          const row = etable.insertRow();
          const idCell = row.insertCell();
          idCell.textContent = employee.employeeID;
          const nameCell = row.insertCell();
          nameCell.textContent = `${employee.firstName} ${employee.lastName}`;
          const emailCell = row.insertCell();
          emailCell.textContent = employee.email;
          const phoneCell = row.insertCell();
          phoneCell.textContent = employee.phone;
          const addressCell = row.insertCell();
          addressCell.textContent = employee.address;
          const roleCell = row.insertCell();
          roleCell.textContent = employee.role;
          const payCell = row.insertCell();
          payCell.textContent = employee.pay;
        });
      }
    })
});
