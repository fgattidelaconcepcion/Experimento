// Función para manejar el evento de "Confirmar compra"
// Lo que hago aquí es escuchar cuando el usuario hace clic en el botón de "checkout" (comprar).
// Si el carrito está vacío, muestro una alerta; si no, muestro el formulario para ingresar los datos del comprador.
document.getElementById('checkout').addEventListener("click", () => {
    const cart = getCart(); // Obtengo los productos del carrito almacenados en localStorage.
    if (cart.length === 0) {
        Swal.fire("El carrito está vacío", "", "warning"); // Si el carrito está vacío, muestro un mensaje de advertencia.
    } else {
        // Si el carrito no está vacío, muestro el formulario para que el usuario ingrese sus datos.
        document.getElementById('checkout-form-container').style.display = 'block';
    }
});

// Lógica de envío del formulario de compra
// Aquí gestiono lo que sucede cuando el usuario envía el formulario de compra con los datos del comprador.
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impido que el formulario se envíe de manera tradicional para manejarlo con JavaScript.

    // Obtengo los valores ingresados por el usuario en el formulario.
    const buyerName = document.getElementById('buyer-name').value;
    const buyerAddress = document.getElementById('buyer-address').value;
    const buyerEmail = document.getElementById('buyer-email').value;
    const cardNumber = document.getElementById('buyer-card').value;

    // Verifico que todos los campos estén completos
    if (!buyerName || !buyerAddress || !buyerEmail || !cardNumber) {
        Swal.fire("Todos los campos son requeridos", "", "error"); // Si falta algún campo, muestro un mensaje de error.
    } else {
        // Simulo una compra exitosa. Uso un promise para simular un proceso asincrónico.
        new Promise((resolve, reject) => {
            setTimeout(() => {
                const success = Math.random() > 0.2; // Genero un resultado aleatorio: 80% de éxito, 20% de error.
                success ? resolve('Compra realizada con éxito') : reject('Hubo un error procesando la compra');
            }, 2000); // Simulo un retraso de 2 segundos antes de resolver o rechazar la promesa.
        })
        .then(message => {
            Swal.fire(message, '', 'success'); // Si la compra fue exitosa, muestro un mensaje de éxito.
            savePurchaseData({
                buyerName,
                buyerAddress,
                buyerEmail,
                cardNumber
            }); // Guardo los datos de la compra en localStorage.
            localStorage.removeItem('cart'); // Elimino el carrito de localStorage después de la compra.
            updateCart(); // Actualizo la visualización del carrito.
            document.getElementById('checkout-form-container').style.display = 'none'; // Oculto el formulario.
        })
        .catch(error => {
            console.error(error);
            Swal.fire('Error en la conexión con el servidor', '', 'error'); // Si hubo un error en la simulación, muestro un mensaje de error.
        });

        // Aquí simulo una solicitud al servidor enviando los datos de la compra.
        const checkoutData = {
            userId: 1, // Usuario ficticio.
            cart: cart, // Los productos del carrito.
            buyer: {
                name: buyerName,
                address: buyerAddress,
                email: buyerEmail,
                card: cardNumber
            }
        };

        // Envío los datos de la compra a un servidor ficticio usando la API de jsonplaceholder.
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(checkoutData)
        })
        .then(response => response.json())
        .then(data => {
            Swal.fire('Compra realizada con éxito en el servidor', '', 'success'); // Si la solicitud es exitosa, muestro un mensaje de éxito.
            localStorage.removeItem('cart'); // Elimino el carrito después de la compra.
            updateCart(); // Actualizo la visualización del carrito.
            document.getElementById('checkout-form-container').style.display = 'none'; // Oculto el formulario.
        })
        .catch(error => {
            console.error('Error al procesar la compra:', error);
            Swal.fire('Error al procesar la compra en el servidor', '', 'error'); // Si hay error al hacer la solicitud, muestro un mensaje de error.
        });
    }
});

// Función para guardar la información de la compra en el localStorage (simulado)
// Aquí guardo los datos de la compra (nombre, dirección, email, tarjeta) en localStorage.
function savePurchaseData(data) {
    localStorage.setItem('purchaseData', JSON.stringify(data)); // Guardo los datos como un objeto JSON.
}

// Cancelar la compra (ocultar el formulario)
// Esta función maneja lo que sucede cuando el usuario cancela el proceso de compra. Solo oculto el formulario.
document.getElementById('cancel-purchase').addEventListener('click', () => {
    document.getElementById('checkout-form-container').style.display = 'none'; // Oculto el formulario de compra.
});

// Clase Juego que representa cada juego
// Aquí creo una clase que representa un juego, con su id, nombre, precio y la imagen del producto.
class Juego {
    constructor(id, name, price, image, description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image; 
        this.description = description; 
    }

    // Método para agregar el juego al carrito
    addToCart(button) {
        const cart = getCart(); // Obtengo el carrito desde localStorage.
        cart.push({
            id: this.id,
            name: this.name,
            price: this.price
        }); 
        saveCart(cart); // Guardo el carrito actualizado en localStorage.
        updateCart(); // Actualizo la visualización del carrito.

        button.disabled = true; // Desactivo el botón después de agregar el juego al carrito.
        button.textContent = "Agregado al carrito"; // Cambio el texto del botón para indicar que ya fue agregado.
    }

    // Método estático para crear un objeto Juego desde un objeto JSON.
    static fromJson(data) {
        return new Juego(data.id, data.name, data.price, data.image, data.description); // Devuelvo una instancia de la clase Juego.
    }
}

// Función para obtener el carrito desde el localStorage
// Aquí obtengo el carrito guardado en el localStorage.
function getCart() {
    const cart = localStorage.getItem('cart'); // Obtengo el carrito de localStorage.
    return cart ? JSON.parse(cart) : []; // Si existe, lo devuelvo como un array; si no, devuelvo un array vacío.
}

// Función para guardar el carrito en localStorage
// Esta función guarda el carrito actualizado en localStorage.
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart)); // Guardo el carrito como un objeto JSON.
}

// Función para actualizar el carrito
// Aquí actualizo la visualización del carrito, mostrando los productos que contiene y el precio total.
function updateCart() {
    const cart = getCart(); // Obtengo el carrito desde localStorage.
    const cartItems = document.getElementById('cart-items'); // Obtengo el contenedor de los items del carrito.
    const totalPrice = document.getElementById('total-price'); // Obtengo el contenedor del precio total.

    cartItems.innerHTML = ''; // Borro los elementos anteriores del carrito.

    const discountRate = 0.10; // Aplico un descuento del 10%.
    let total = 0; // Inicializo la variable para el precio total.

    // Recorro cada producto en el carrito para calcular su precio con descuento y agregarlo a la lista.
    cart.forEach(item => {
        const discountedPrice = (parseFloat(item.price) * (1 - discountRate)).toFixed(2); // Aplico el descuento.
        total += parseFloat(discountedPrice); // Sumo el precio con descuento al total.

        const li = document.createElement('li'); // Creo un elemento de lista para cada item.
        li.textContent = `${item.name} - $${discountedPrice}`; // Muestro el nombre y precio con descuento del juego.

        const deleteBtn = document.createElement('button'); // Creo un botón para eliminar el item.
        deleteBtn.textContent = "Eliminar"; // Texto del botón.
        deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2'); // Agrego clases para estilizar el botón.
        deleteBtn.addEventListener('click', () => removeFromCart(item.id)); // Al hacer clic en el botón, llamo a la función para eliminar el producto.

        li.appendChild(deleteBtn); // Agrego el botón de eliminar al item.
        cartItems.appendChild(li); // Agrego el item al contenedor del carrito.
    });

    totalPrice.textContent = total.toFixed(2); // Muestra el precio total en el HTML.
}

// Función para eliminar un producto del carrito
// Aquí elimino un producto específico del carrito.
function removeFromCart(productId) {
    let cart = getCart(); // Obtengo el carrito desde localStorage.
    cart = cart.filter(item => item.id !== productId); // Filtrar los productos y eliminar el que tiene el ID especificado.
    saveCart(cart); // Guardar el carrito actualizado.
    updateCart(); // Actualizo la visualización del carrito.

    // Rehabilito el botón de agregar al carrito si el producto fue eliminado.
    const card = document.querySelector(`[data-id="${productId}"]`);
    if (card) {
        const button = card.querySelector('.add-to-cart');
        button.disabled = false;
        button.textContent = "Agregar al carrito";
    }
}

// Función para cargar los productos desde un archivo JSON
// Aquí cargo los productos desde un archivo JSON y los muestro en la página.
function loadProducts() {
    fetch('productos.json')
        .then(response => response.json()) // Obtengo los datos del archivo JSON.
        .then(data => {
            const productContainer = document.querySelector('.card-container'); // Contenedor donde se van a mostrar las cards.
            data.forEach(product => {
                const juego = Juego.fromJson(product); // Creo una instancia de Juego desde los datos JSON.
                const card = createCard(juego); // Creo una tarjeta para cada juego.
                productContainer.appendChild(card); // Agrego la tarjeta al contenedor.
            });
        })
        .catch(error => console.error('Error al cargar los productos:', error)); // En caso de error, muestro un mensaje.
}

// Función para crear una card
// Aquí creo una card para cada juego con su imagen, nombre, precio y botón para agregar al carrito.
function createCard(juego) {
    const card = document.createElement('div');
    card.classList.add('card');

    // Creación de la card con la descripción
    card.innerHTML = `
    <img src="${juego.image}" class="card-img-top" alt="${juego.name}">
    <div class="card-body">
        <h5 class="card-title">${juego.name}</h5>
        <p class="card-text">${juego.description}</p> <!-- Descripción del juego -->
        <button class="btn btn-primary add-to-cart">Agregar al carrito</button>
        <p class="price">$${juego.price}</p>
    </div>
`;

    // Evento para el botón
    const addToCartButton = card.querySelector('.add-to-cart');
    addToCartButton.addEventListener('click', (e) => juego.addToCart(e.target));

    return card;
}


// Inicialización de la página
// Aquí hago que la página cargue los productos y actualice el carrito cuando se cargue el contenido.
document.addEventListener('DOMContentLoaded', function () {
    loadProducts(); // Cargo los productos desde el JSON.
    updateCart(); // Inicializo la visualización del carrito.
});
