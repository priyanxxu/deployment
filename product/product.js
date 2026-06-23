
let products = [];
let cart = 0;

async function loadProducts() {
    let res = await fetch("https://fakestoreapi.com/products");
    products = await res.json();
    showProducts(products);
}

function showProducts(data) {
    let box = document.getElementById("productList");
    box.innerHTML = "";

    data.forEach(p => {
        let div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
      <img src="${p.image}">
      <h4>${p.title}</h4>
      <div class="price">₹${Math.round(p.price * 80)}</div>
      <button onclick="addToCart({name: '${p.title.replace(/'/g, "\\'")}', image: '${p.image}', price: ${Math.round(p.price * 80)}, id: ${p.id}})">Add to Cart</button>
    `;

        box.appendChild(div);
    });
}

function searchProduct() {
    let text = document.getElementById("search").value.toLowerCase();

    let filtered = products.filter(p =>
        p.title.toLowerCase().includes(text)
    );

    showProducts(filtered);
}

function sortProducts(type) {
    let sorted = [...products];

    if (type == "low") {
        sorted.sort((a, b) => a.price - b.price);
    }
    else if (type == "high") {
        sorted.sort((a, b) => b.price - a.price);
    }

    showProducts(sorted);
}

function filterPrice(limit) {

    if (limit == "") {
        showProducts(products);
        return;
    }

    if (limit == "100000") {
        let filtered = products.filter(p =>
            Math.round(p.price * 80) > 2500
        );
        showProducts(filtered);
        return;
    }

    let filtered = products.filter(p =>
        Math.round(p.price * 80) <= limit
    );

    showProducts(filtered);
}

loadProducts();
cart = JSON.parse(localStorage.getItem("cart")) || [];

updateCartCount();

function addToCart(product){
    cart.push(product);
    localStorage.setItem("cart",JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount(){

    document.getElementById("cartCount").innerText=cart.length;

}

function openCart(){

    document.getElementById("cartSidebar").classList.add("active");

    document.getElementById("overlay").classList.add("active");

    displayCart();
}

function closeCart(){

    document.getElementById("cartSidebar").classList.remove("active");

    document.getElementById("overlay").classList.remove("active");

}

function displayCart(){

    let container=document.getElementById("cartItems");

    let total=0;

    container.innerHTML="";

    if(cart.length===0){

        container.innerHTML="<h3>Your cart is empty.</h3>";

        document.getElementById("totalPrice").innerText=0;

        return;
    }

    cart.forEach((item,index)=>{

        total+=item.price;

        container.innerHTML+=`

        <div class="cart-item">

            <img src="${item.image}" alt="">

            <div class="cart-details">

                <h4>${item.name}</h4>

                <p>₹${item.price}</p>

                <button class="remove-btn"
                onclick="removeItem(${index})">
                Remove
                </button>

            </div>

        </div>

        `;

    });

    document.getElementById("totalPrice").innerText=total;

}

function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    updateCartCount();

    displayCart();

}

function checkout(){

    if(cart.length===0){
        return;
    }
    displayCart();

}