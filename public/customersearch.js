// reference to the search form and table ids
const searchForm = document.getElementById('customer-search-form');
const table = document.getElementById('customer-results-table');

// event listener for the search form
searchForm.addEventListener('submit', event => {
  event.preventDefault();

  // gets search query from the form
  const firstName = searchForm.elements['firstname'].value;
  const lastName = searchForm.elements['lastname'].value;

  // Makes a request to the server to search for customers with the given names
  fetch(`/customersearch?firstName=${firstName}&lastName=${lastName}`)
    .then(response => response.json())
    .then(customers => {
      if (customers.length === 0) {
        // if no results found
        const row = table.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 5;
        cell.textContent = 'No results found.';
      } else {
        // generates table with results 
        customers.forEach(customer => {
          const row = table.insertRow();
          const idCell = row.insertCell();
          idCell.textContent = customer.customerID;
          const nameCell = row.insertCell();
          nameCell.textContent = `${customer.firstName} ${customer.lastName}`;
          const emailCell = row.insertCell();
          emailCell.textContent = customer.email;
          const addressCell = row.insertCell();
          addressCell.textContent = customer.address;
          const phoneCell = row.insertCell();
          phoneCell.textContent = customer.phone;
        });
      }
    })
});
