

// Function to fetch data
async function fetchData() {
    try {
        const response = await fetch('products.json'); // Replace with your actual data source
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Function to show products based on category
function showProducts(category) {
    const productListContainer = document.getElementById('productList');

    fetchData()
        .then(data => {
            const categoryData = data.categories.find(cat => cat.category_name.toLowerCase() === category.toLowerCase());

            if (categoryData) {
                const categoryProducts = categoryData.category_products;

                if (categoryProducts) {
                    const productListHTML = categoryProducts.map(product => {
                        return `<div class="card">
                        <div class="badge">${product.badge_text ? product.badge_text : ''}</div>
                                    <img src="${product.image}" alt="${product.title}" />
                                    
                                    <h3 style="display: inline-block">${product.title } .</h3>
                                    <p style="display: inline-block">${product.vendor}</p>
                                  
                                    <div class="price-container">
                                    <p class="price">$${product.price} </p>
                                    ${product.compare_at_price ? `
                                    <p class="compare-price">$${product.compare_at_price}  </p>
                                    <p class="discount">50% off</p>` : ''}
                                    </div> 
                                    <button class="add-to-cart" onclick="addToCart('${product.id}', '${product.title}', ${product.price})">Add to Cart</button>
                                </div>`;
                    }).join('');

                    productListContainer.innerHTML = productListHTML;
                }
            } else {
                console.error('Category not found:', category);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error if needed
        });
}

// Example: You can call showProducts with a category
// showProducts('men');

// Alternatively, you can attach the showProducts function to an event listener,
// like button clicks, in your HTML file.
