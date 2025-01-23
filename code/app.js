  let cart = JSON.parse(localStorage.getItem('cart')) || []; 
    let productData = []; 
    const updateCartDisplay = () => {
        const cartButton = document.querySelector('.button span'); 
        cartButton.textContent = `(${cart.length})`; 
    };
    
    const displayProducts = (category) => {
        let filteredProducts = productData;
        if (category !== "All") {
            filteredProducts = productData.filter(product => product.category === category);
        }

        const containerCards = filteredProducts.map((product) => {
            return `
            <div class="productCard card">
                <img class="fw-3 pb-2 card-img-top" src="${product.image}" alt="${product.title}">
                <div class="card-body border-bottom">
                    <h5>${product.title.substring(0, 12)}...</h5>
                    <p>${product.description.substring(0, 50)}...</p>
                </div>
                <div class="priceSection pt-2">
                    <p>$ ${product.price}</p>
                </div>
                <div class="card-body border-top">
                    <button class="btn btn-dark me-2 details-btn" data-id="${product.id}">Details</button>
                    <button class="btn btn-dark me-2 add-to-cart-btn" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}">Add to Cart</button>    
                </div>
            </div>
            `;
        });

        const container = document.getElementById('productsContainer');
        container.innerHTML = containerCards.join("");
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const productId = event.target.getAttribute('data-id');
                const productTitle = event.target.getAttribute('data-title');
                const productPrice = parseFloat(event.target.getAttribute('data-price'));
                const productImage = event.target.getAttribute('data-image');
                const existingProduct = cart.find((item) => item.id === productId);
                if (existingProduct) {
                    existingProduct.quantity += 1; 
                } else {
                    cart.push({ id: productId, title: productTitle, price: productPrice, image: productImage, quantity: 1 });
                }

                localStorage.setItem('cart', JSON.stringify(cart)); 
                updateCartDisplay();
                alert(`${productTitle} has been added to your cart!`);
            });
        });
        const detailButtons = document.querySelectorAll('.details-btn');
        detailButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const productId = event.target.getAttribute('data-id');
                alert(`Details for product ID: ${productId}`);
            });
        });
    };
    fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => {
            productData = data;
            displayProducts("All"); 
            const categoryButtons = document.querySelectorAll('.categoryBtn button');
            categoryButtons.forEach((button) => {
                button.addEventListener('click', (event) => {
                    const category = event.target.textContent.trim();
                    let apiCategory;
                    if (category === "Men's Clothing") apiCategory = "men's clothing";
                    else if (category === "Women's Clothing") apiCategory = "women's clothing";
                    else if (category === "Jewelery") apiCategory = "jewelery";
                    else if (category === "Electronics") apiCategory = "electronics";
                    else apiCategory = "All";
                    displayProducts(apiCategory);
                });
            });
        })
        .catch((error) => {
            alert("Error loading products: " + error);
        });
    updateCartDisplay();

