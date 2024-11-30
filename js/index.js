// Clase Juego que representa un producto
class Juego {
    constructor(id, name, price = 49.99) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    // Método para agregar el juego al carrito
    addToCart(button) {
        const cart = getCart();
        cart.push({
            id: this.id,
            name: this.name,
            price: this.price
        });
        saveCart(cart);
        updateCart();
        button.disabled = true;
        button.textContent = "Agregado al carrito";
    }

    static fromElement(card) {
        const id = card.dataset.id;
        const name = card.dataset.name;
        const price = parseFloat(card.dataset.price);
        return new Juego(id, name, price);
    }
}

// Función para cargar los productos (simulación de un archivo JSON)
async function fetchProducts() {
    // Simulando la carga de productos desde un archivo JSON
    const products = [
        { id: "1", name: "Battlefield 2042", price: 49.99 },
        { id: "2", name: "Black Ops 6", price: 59.99 },
        { id: "3", name: "Counter Strike 2", price: 39.99 },
        { id: "4", name: "Red Dead Redemption", price: 59.99 }
    ];

    displayProducts(products);
}

// Función para mostrar los productos en el DOM
function displayProducts(products) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; // Limpiamos el contenedor antes de agregar los nuevos productos

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('card');
        productCard.dataset.id = product.id;
        productCard.dataset.name = product.name;
        productCard.dataset.price = product.price;

        productCard.innerHTML = `
            <img src="images/${product.name.toLowerCase().replace(/\s/g, '')}.jpg" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">Precio: $${product.price}</p>
                <button class="add-to-cart btn btn-primary">Agregar al carrito</button>
            </div>
        `;

        const addToCartButton = productCard.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', (event) => handleAddToCart(event));

        productContainer.appendChild(productCard);
    });
}

// Función para manejar el evento de agregar al carrito
function handleAddToCart(event) {
    const card = event.target.closest('.card');
    const juego = Juego.fromElement(card);
    juego.addToCart(event.target);
}

// Función para obtener el carrito desde localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Función para guardar el carrito en localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para actualizar la vista del carrito
function updateCart() {
    const cart = getCart();
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Eliminar";
        deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2');
        deleteBtn.addEventListener('click', () => removeFromCart(item.id));

        li.appendChild(deleteBtn);
        cartItems.appendChild(li);

        total += parseFloat(item.price);
    });

    totalPrice.textContent = total.toFixed(2);
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    updateCart();

    const card = document.querySelector(`[data-id="${productId}"]`);
    if (card) {
        const button = card.querySelector('.add-to-cart');
        button.disabled = false;
        button.textContent = "Agregar al carrito";
    }
}

// Función para manejar el checkout
function checkout() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    const checkoutData = { userId: 1, cart: cart };

    new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() > 0.2;
            if (success) {
                resolve('Compra realizada con éxito');
            } else {
                reject('Hubo un error procesando la compra');
            }
        }, 2000);
    })
    .then(message => {
        alert(message);
        localStorage.removeItem('cart');
        updateCart();
    })
    .catch(error => {
        console.error(error);
        alert('Error en la conexión con el servidor');
    });

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkoutData)
    })
    .then(response => response.json())
    .then(data => console.log('Compra procesada:', data))
    .catch(error => console.error('Error en el checkout:', error));
}

// Evento de checkout
document.getElementById('checkout-btn').addEventListener('click', checkout);

// Cargar los productos cuando la página cargue
window.addEventListener('DOMContentLoaded', fetchProducts);
