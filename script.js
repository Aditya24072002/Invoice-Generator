document.getElementById('invoice-form').addEventListener('submit', addItem);

let totalAmount = 0;

function addItem(e) {
    e.preventDefault();

    const itemName = document.getElementById('item-name').value;
    const itemPrice = parseFloat(document.getElementById('item-price').value);
    const itemQuantity = parseInt(document.getElementById('item-quantity').value);

    const totalPrice = itemPrice * itemQuantity;
    const tax = totalPrice * 0.18;
    const total = totalPrice + tax;

    const tableBody = document.querySelector('#invoice-table tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${itemName}</td>
        <td>${itemQuantity}</td>
        <td>₹${itemPrice.toFixed(2)}</td>
        <td>₹${totalPrice.toFixed(2)}</td>
        <td>₹${tax.toFixed(2)}</td>
        <td>₹${total.toFixed(2)}</td>
    `;

    tableBody.appendChild(row);

    totalAmount += total;
    document.getElementById('total-amount').textContent = `₹${totalAmount.toFixed(2)}`;

    document.getElementById('invoice-form').reset();
}

function printInvoice() {
    const customerName = document.getElementById('customer-name').value;
    const customerContact = document.getElementById('customer-contact').value;
    const invoiceDate = new Date().toLocaleString(); // Current date and time

    const invoiceTable = document.getElementById('invoice-table').innerHTML;
    const printContents = `
        <html>
        <head>
            <title>Invoice</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 10px;
                    text-align: left;
                }
                th {
                    background-color: #f4f4f4;
                }
                .total-amount {
                    text-align: right;
                    margin-top: 20px;
                }
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #invoice, #invoice * {
                        visibility: visible;
                    }
                    #invoice {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 5px;
                        box-shadow: none;
                    }
                    #invoice h2 {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    table {
                        margin-bottom: 10px;
                    }
                    .total-amount {
                        text-align: right;
                        margin-top: 20px;
                        font-weight: bold;
                    }
                }
            </style>
        </head>
        <body>
            <div id="invoice">
                <h2>Invoice</h2>
                <div>
                    <strong>Customer Name:</strong> ${customerName}<br><br>
                    <strong>Customer Contact:</strong> ${customerContact}<br><br>
                    <strong>Invoice Date:</strong> ${invoiceDate}<br><br>
                </div>
                <table>
                    
                    <tbody>
                        ${invoiceTable}
                    </tbody>
                </table>
                <div class="total-amount">
                    <strong>Total Amount:</strong> ₹${totalAmount.toFixed(2)}
                </div>
            </div>
            <script>
                setTimeout(() => {
                    window.print();
                }, 100);
            </script>
        </body>
        </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(printContents);
    printWindow.document.close();
}
{/* <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Price (₹)</th>
                            <th>Price x Quantity (₹)</th>
                            <th>Tax (18%) (₹)</th>
                            <th>Total (₹)</th>
                        </tr>
                    </thead> */}