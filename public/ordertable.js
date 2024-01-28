const table = document.querySelector('.custtable');

// genrates the order table after festching data from the db 
fetch('/orders')
  .then(response => response.json())
  .then(data => {
    data.forEach(order => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${order.orderID}</td>
        <td>${order.customerID}</td>
        <td>${order.employeeID}</td>
        <td>${order.date}</td>
        <td>${order.total}</td>
        <td>
        <button onclick="deleteorder(${order.orderID})">Delete</button>
        </td>
        `;
      table.appendChild(row);
  });
});

// adds delete functionality to the delete button 
function deleteorder(orderID) {
  if (confirm("Are you sure you want to delete this order?")) {
    fetch(`/orders/${orderID}`, {
      method: 'DELETE'
    })
    .then(() => {
      alert("order deleted successfully!");
      location.reload();
    })
    .catch((error) => {
      console.error('Error deleting order:', error);
      alert("Error deleting order. Please try again later.");
    });
  }
};
