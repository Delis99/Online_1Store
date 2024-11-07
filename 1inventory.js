// Array to store products
let products = [];

// Function to add a new product
document.getElementById('productForm').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const name = document.getElementById('productName').value;
    const category = document.getElementById('category').value;
    const price = parseFloat(document.getElementById('price').value);
    const stockCount = parseInt(document.getElementById('stockCount').value);
    
    const product = {
        name,
        category,
        price,
        stockCount
    };

    products.push(product);
    displayInventory();
    document.getElementById('productForm').reset();
});

// Function to search for a product by name and display it below the search section
function searchProduct() {
    const searchName = document.getElementById('searchInput').value.toLowerCase();
    const searchResultDiv = document.getElementById('searchResult');
    const productIndex = products.findIndex(prod => prod.name.toLowerCase() === searchName);

    if (productIndex !== -1) {
        const product = products[productIndex];
        searchResultDiv.innerHTML = `
            <h3>Search Result:</h3>
            <p><strong>Product Name:</strong> ${product.name}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
            <p><strong>Stock Count:</strong> ${product.stockCount}</p>
            <button onclick="editProduct(${productIndex})">Edit</button>
            <button onclick="deleteProduct(${productIndex})">Delete</button>
        `;
    } else {
        searchResultDiv.innerHTML = `<p>Product not found.</p>`;
    }
}

// Function to delete a product
function deleteProduct(index) {
    products.splice(index, 1);
    displayInventory();
    document.getElementById('searchResult').innerHTML = `<p>Product deleted.</p>`;
}

// Function to edit a product
function editProduct(index) {
    const product = products[index];
    const searchResultDiv = document.getElementById('searchResult');
    searchResultDiv.innerHTML = `
        <h3>Edit Product:</h3>
        <label for="editName">Product Name:</label>
        <input type="text" id="editName" value="${product.name}" required><br>

        <label for="editCategory">Category:</label>
        <input type="text" id="editCategory" value="${product.category}" required><br>

        <label for="editPrice">Price:</label>
        <input type="number" id="editPrice" value="${product.price}" required min="0" step="0.01"><br>

        <label for="editStock">Stock Count:</label>
        <input type="number" id="editStock" value="${product.stockCount}" required min="0"><br>

        <button onclick="saveProduct(${index})">Save</button>
        <button onclick="cancelEdit()">Cancel</button>
    `;
}

// Function to save edited product
function saveProduct(index) {
    const editedName = document.getElementById('editName').value;
    const editedCategory = document.getElementById('editCategory').value;
    const editedPrice = parseFloat(document.getElementById('editPrice').value);
    const editedStock = parseInt(document.getElementById('editStock').value);

    products[index] = {
        name: editedName,
        category: editedCategory,
        price: editedPrice,
        stockCount: editedStock
    };

    displayInventory();
    document.getElementById('searchResult').innerHTML = `<p>Product updated successfully.</p>`;
}

// Function to cancel editing
function cancelEdit() {
    document.getElementById('searchResult').innerHTML = '';
}

// Function to display the inventory in the table
function displayInventory() {
    const inventoryTableBody = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
    inventoryTableBody.innerHTML = '';

    products.forEach((product, index) => {
        const row = inventoryTableBody.insertRow();
        row.insertCell(0).textContent = product.name;
        row.insertCell(1).textContent = product.category;
        row.insertCell(2).textContent = `$${product.price.toFixed(2)}`;
        row.insertCell(3).textContent = product.stockCount;
    });
}
