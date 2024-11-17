// Clase Juego que representa un producto
class Juego {
    // Constructor que recibe id y nombre, y genera un precio aleatorio
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.price = this.getRandomPrice(); // Asigno un precio aleatorio al juego
    }

    // Método para generar un precio aleatorio entre $29.99 y $99.99
    getRandomPrice() {
        return (Math.random() * (99 - 29) + 29).toFixed(2); // Devuelvo el precio con 2 decimales
    }

    // Método para agregar el juego al carrito
    addToCart() {
        const cart = getCart(); // Obtengo el carrito actual del localStorage
        cart.push({ // Agrego el juego al carrito
            id: this.id,
            name: this.name,
            price: this.price
        });
        saveCart(cart); // Guardo el carrito actualizado
        updateCart(); // Actualizo la vista del carrito
    }

    // Método estático para crear un objeto Juego a partir de un elemento HTML (card)
    static fromElement(card) {
        const id = card.dataset.id; // Obtengo el id del dataset de la card
        const name = card.dataset.name; // Obtengo el nombre del dataset de la card
        return new Juego(id, name); // Devuelvo una nueva instancia de Juego
    }
}

// Función para obtener el carrito desde el localStorage
function getCart() {
    const cart = localStorage.getItem('cart'); // Intento obtener el carrito del localStorage
    return cart ? JSON.parse(cart) : []; // Si existe, lo devuelvo parseado; sino, devuelvo un array vacío
}

// Función para guardar el carrito en localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart)); // Guardo el carrito como un string JSON
}

// Función para actualizar la vista del carrito en el HTML
function updateCart() {
    const cart = getCart(); // Obtengo el carrito actual
    const cartItems = document.getElementById('cart-items'); // Selecciono el contenedor donde mostrar los items
    const totalPrice = document.getElementById('total-price'); // Selecciono el contenedor del total del carrito

    cartItems.innerHTML = ''; // Limpio el contenido del carrito en la vista

    let total = 0; // Inicializo el total en 0
    cart.forEach(item => {
        const li = document.createElement('li'); // Creo un nuevo item de lista
        li.textContent = `${item.name} - $${item.price}`; // Asigno el nombre y precio del item
        
        // Creo el botón para eliminar el producto
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Eliminar"; // Botón que dirá "Eliminar"
        deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2'); // Le añado clases para estilo
        deleteBtn.addEventListener('click', () => removeFromCart(item.id)); // Al hacer click, elimina el item
        
        li.appendChild(deleteBtn); // Añado el botón al li
        cartItems.appendChild(li); // Añado el li al contenedor de items
        total += parseFloat(item.price); // Acumulo el precio total
    });

    totalPrice.textContent = total.toFixed(2); // Muestro el precio total con dos decimales
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    let cart = getCart(); // Obtengo el carrito actual
    cart = cart.filter(item => item.id !== productId); // Filtro el carrito para eliminar el item con el id dado
    saveCart(cart); // Guardo el carrito actualizado
    updateCart(); // Actualizo la vista del carrito
}

// Función para confirmar la compra con una llamada simulada a un servidor
function checkout() {
    const cart = getCart(); // Obtengo el carrito actual
    if (cart.length === 0) { // Si el carrito está vacío, muestro un mensaje
        alert('El carrito está vacío');
        return;
    }

    // Creo los datos para enviar en la compra
    const checkoutData = {
        userId: 1,  // Simulo un id de usuario (esto sería un ID real en un sistema de autenticación)
        cart: cart
    };

    // Simulo una promesa que "procesa" la compra con un retraso de 2 segundos
    new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() > 0.2; // Simulo un 80% de probabilidades de éxito
            if (success) {
                resolve('Compra realizada con éxito');
            } else {
                reject('Hubo un error procesando la compra');
            }
        }, 2000); // Espera 2 segundos para "procesar" la compra
    })
    .then(message => { // Si la compra es exitosa
        alert(message); // Muestro el mensaje de éxito
        localStorage.removeItem('cart'); // Limpio el carrito del localStorage
        updateCart(); // Actualizo la vista del carrito
    })
    .catch(error => { // Si hubo un error
        console.error(error); // Muestro el error en la consola
        alert('Error en la conexión con el servidor'); // Aviso al usuario que hubo un error
    });

    // Aquí vamos a simular también un `fetch` para enviar la compra a un servidor
    fetch('https://jsonplaceholder.typicode.com/posts', {  // URL de ejemplo para simular el envío de la compra
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  // Aseguramos que el cuerpo de la solicitud sea JSON
        },
        body: JSON.stringify(checkoutData) // Convertimos el carrito a formato JSON
    })
    .then(response => response.json())  // Procesamos la respuesta del servidor
    .then(data => {
        console.log('Compra procesada:', data); // Mostramos la respuesta en la consola
        alert('Compra realizada con éxito en el servidor');
        localStorage.removeItem('cart'); // Limpiamos el carrito
        updateCart(); // Actualizamos la vista
    })
    .catch(error => {
        console.error('Error en la compra:', error); // Mostramos el error si algo falla
        alert('Error al procesar la compra en el servidor');
    });
}

// Función para asignar precios aleatorios a los productos (cuando se cargan en la página)
function assignRandomPrices() {
    const priceElements = document.querySelectorAll('.price'); // Obtengo todos los elementos con clase 'price'
    priceElements.forEach(element => {
        const randomPrice = (Math.random() * (99 - 29) + 29).toFixed(2); // Genero un precio aleatorio entre $29.99 y $99.99
        element.textContent = `$${randomPrice}`; // Muestra el precio generado en el elemento
        element.closest('.card').dataset.price = randomPrice; // Asigno el precio al dataset de la card
    });
}

// Manejo del evento de agregar al carrito cuando el usuario hace clic en el botón "Agregar al carrito"
function handleAddToCart(event) {
    const card = event.target.closest('.card'); // Obtengo la card del juego donde se hizo clic
    const juego = Juego.fromElement(card); // Creo una instancia del juego a partir de esa card
    juego.addToCart(); // Agrego el juego al carrito
}

// Asegurándome de que los botones "Agregar al carrito" estén correctamente vinculados
document.addEventListener('DOMContentLoaded', function() {
    // Agrego el evento de "Agregar al carrito" a cada botón
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });

    // Inicializo la vista del carrito y los precios aleatorios
    updateCart();
    assignRandomPrices();
});

// Evento para el botón de "Confirmar compra"
document.getElementById('checkout').addEventListener('click', checkout);
