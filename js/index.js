// Crear una clase Juego que representará cada juego
class Juego {
    constructor(id, name, price) {
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

    static fromJson(data) {
        return new Juego(data.id, data.name, data.price);
    }
}

// Función para obtener el carrito desde el localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Función para guardar el carrito en localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para actualizar la vista del carrito con descuento
function updateCart() {
    const cart = getCart();
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');

    cartItems.innerHTML = '';

    const discountRate = 0.10;
    let total = 0;

    // Aplica descuento a cada item en el carrito y calcula el total
    cart.forEach(item => {
        const discountedPrice = (parseFloat(item.price) * (1 - discountRate)).toFixed(2);
        total += parseFloat(discountedPrice);

        const li = document.createElement('li');
        li.textContent = `${item.name} - $${discountedPrice}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Eliminar";
        deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2');
        deleteBtn.addEventListener('click', () => removeFromCart(item.id));

        li.appendChild(deleteBtn);
        cartItems.appendChild(li);
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

// Función para confirmar la compra
function checkout() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    const checkoutData = { userId: 1, cart: cart };

    // Simulación de compra
    new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() > 0.2;
            success ? resolve('Compra realizada con éxito') : reject('Hubo un error procesando la compra');
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
    .then(data => {
        alert('Compra realizada con éxito en el servidor');
        localStorage.removeItem('cart');
        updateCart();
    })
    .catch(error => {
        console.error('Error al procesar la compra:', error);
        alert('Error al procesar la compra en el servidor');
    });
}

// Función para cargar los productos desde un archivo JSON
function loadProducts() {
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            const productContainer = document.querySelector('.card-container');
            data.forEach(product => {
                const juego = Juego.fromJson(product);
                const card = createCard(juego);
                productContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}

// Función para crear una card
function createCard(juego) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = juego.id;

    card.innerHTML = `
        <img src="images/${juego.id}.jpg" class="card-img-top" alt="${juego.name}">
        <div class="card-body">
            <h5 class="card-title">${juego.name}</h5>
            <p class="card-text">Descripción del juego ${juego.name}...</p>
            <button class="btn btn-primary add-to-cart">Agregar al carrito</button>
            <p class="price">$${juego.price}</p>
        </div>
    `;

    const addToCartButton = card.querySelector('.add-to-cart');
    addToCartButton.addEventListener('click', (e) => juego.addToCart(e.target));

    return card;
}

// Manejo del evento de "Confirmar compra"
document.getElementById('checkout').addEventListener('click', checkout);

// Inicialización de la página
document.addEventListener('DOMContentLoaded', function () {
    loadProducts(); // Cargar los productos desde el JSON
    updateCart(); // Inicializar el carrito en la página
});
