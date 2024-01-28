const table = document.querySelector('.custtable');

fetch('/items')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.itemID}</td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.restriction}</td>
        <td>
        <button onclick="deleteItem(${item.itemID})">Delete</button>
        <button onclick="editItem(${item.itemID}, '${item.name}', '${item.price}', '${item.restriction}')">Edit</button>
        </td>
        `;
      table.appendChild(row);
    });
});

function editItem(itemID) {
    // fetch employee data from the server
    fetch(`/items/${itemID}`)
      .then(response => response.json())
      .then(item => {
        // create a form and populate it with existing employee data
        const form = document.createElement('form');
        form.innerHTML = `
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" value="${item.name}">
          <br>
          <label for="price">Price</label>
          <input type="text" id="price" name="price" value="${item.price}">
          <br>
          <label for="restriction">Restriction:</label>
          <input type="text" id="restriction" name="restriction" value="${item.restriction}">
          <br>
          <button type="submit">Save</button>
          `;
        
        // add event listener for form submission
        form.addEventListener('submit', event => {
          event.preventDefault();
            
          // create object with updated Item information
          const updatedItem = {
            itemID: itemID,
            name: form.name.value,
            price: form.price.value,
            restriction: form.restriction.value,
          };
            
          // send PUT request to update the Item in the database
          fetch(`/items/${itemID}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedItem)
          })
          .then(data => {
            // display success message to the user
            console.log('Item updated successfully!');
            alert('Item updated successfully!');
            // reload the Item table
            location.reload();
          })
          .catch(error => {
            // display error message to the user
            alert('Error updating Item. Please try again later.');
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
        console.error('Error fetching Item data:', error);
        alert('Error fetching Item data. Please try again later.');
    });
}

function deleteItem(itemID) {
  if (confirm("Are you sure you want to delete this Item?")) {
    fetch(`/items/${itemID}`, {
      method: 'DELETE'
    })
    .then(() => {
      alert("Item deleted successfully!");
      location.reload();
    })
    .catch((error) => {
      console.error('Error deleting Item:', error);
      alert("Error deleting Item. Please try again later.");
    });
  }
};

