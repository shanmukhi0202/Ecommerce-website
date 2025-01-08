fetch("https://fakestoreapi.com/products")
.then((response)=>{
    return response.json()
}).then((data)=>{
    const productData=data;
    const containerCards=productData.map((product)=>{
        console.log(product)
        return(
        `
      <div class="productCard card">
         <img class="fw-3 pb-2 card-img-top" src=${product.image} alt=${product.title}>
          <div class="card-body border-bottom">
           <h5>${product.title.substring(0,12)}...</h5>
           <p>${product.description.substring(0,50)}...</p>
          </div>
          <div class="priceSection pt-2">
           <p>$ ${product.price}</p>
          </div>
          <div class="card-body border-top">
            <button class="btn btn-dark me-2 ">Details</button>
            <button class="btn btn-dark me-2 ">Add to Cart</button>    
          </div>
      </div>
    
        ` 
    )
    })

    const container=document.getElementById('productsContainer')
    container.innerHTML=containerCards.join("");
}).catch((error)=>{
    alert(error)
})