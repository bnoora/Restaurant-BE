// reference to the search form id
const form = document.getElementById('search-form');
// event listener for the search form
form.addEventListener('submit', function (event) {
    event.preventDefault();
      // gets search query from the form
    const orderId = document.getElementById('oid').value;
      
    // Makes a request to the server to search for customers with the given names
    fetch(`/orderitems/${orderId}`)
        .then(response => response.json())
        .then(data => {
            const table = document.querySelector('.custtable');
            table.innerHTML = `
                <tr>
                    <th>OrderID</th>
                    <th>ItemID</th>
                    <th>Count</th>
                </tr>
            `;
            // generates table with results
            data.forEach(orderitem => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${orderitem.orderID}</td>
                    <td>${orderitem.itemID}</td>
                    <td>${orderitem.number}</td>
                `;
                table.appendChild(row);
            });
        })
        .catch(error => console.error(error));
});
