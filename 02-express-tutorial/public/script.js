document.getElementById('fetchProducts').addEventListener('click', () => {
    // fetch-request to API
    fetch('/api/v1/products')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            const container = document.getElementById('productContainer');
            container.innerHTML = ''; // Empty container before adding new data

            // Checking and adding products to contaner
            data.forEach((product) => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';

                productDiv.innerHTML = `
                    <h2>${product.name}</h2>
                    <img src="${product.image}" alt="${product.name}" style="width:200px;"/>
                    <p>Price: $${product.price}</p>
                    <p>${product.desc}</p>
                `;
                container.appendChild(productDiv);
            });
        })
        .catch((error) => {
            console.error('Error fetching products:', error);
        });
});