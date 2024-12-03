House of Shooters
¡Bienvenidos a House of Shooters! Esta es una aplicación de compras en línea para videojuegos, que permite a los usuarios navegar por una selección de juegos, agregarlos a su carrito y realizar una compra simulada. El proyecto está hecho completamente en JavaScript, HTML y CSS, utilizando localStorage para almacenar los datos del carrito y los detalles de la compra.

Descripción del código:
Este proyecto se compone principalmente de dos partes: la gestión del carrito de compras y la simulación del proceso de compra. Aquí te explico cómo funciona cada parte:

1. Gestión del carrito:
Agregar productos al carrito: Cada juego tiene un botón de "Agregar al carrito" que, al hacer click, agrega el juego al carrito almacenado en el localStorage. Los productos se guardan como un arreglo de objetos con la información del juego (nombre, precio, etc.).
Visualización del carrito: El carrito se muestra en tiempo real en la interfaz de usuario. Cuando se agrega o elimina un producto, se actualiza la vista del carrito con el nombre del juego, el precio con un descuento del 10% y un botón para eliminar el producto.
Eliminar productos: Los usuarios pueden eliminar juegos del carrito, y el sistema actualiza el carrito en localStorage y la visualización de manera automática.
2. Proceso de compra:
Formulario de compra: Cuando el usuario decide realizar una compra, el sistema muestra un formulario para ingresar los datos del comprador (nombre, dirección, email y número de tarjeta).
Validación de datos: Antes de procesar la compra, el sistema verifica que todos los campos del formulario estén completos. Si algún campo falta, muestra un mensaje de error.
Simulación de compra exitosa: Cuando el formulario está completo, se simula el proceso de compra con una promesa que tiene un 80% de éxito y un 20% de posibilidad de error. Si la compra es exitosa, los datos se guardan en localStorage y el carrito se limpia.
Simulación de solicitud al servidor: También simulo el envío de los datos de la compra a un servidor ficticio usando la API de jsonplaceholder. En caso de éxito, se muestra un mensaje confirmando la compra; en caso de error, se muestra un mensaje de error.
3. Interacción con el localStorage:
Los datos del carrito y los datos de la compra se guardan localmente usando localStorage, lo que permite que el carrito persista incluso si el usuario recarga la página o cierra el navegador.
Los datos del carrito se recuperan y actualizan cada vez que se realiza una acción (agregar, eliminar productos o realizar una compra).
4. Estructura de la aplicación:
Clases y objetos: La aplicación utiliza una clase Juego que representa un producto (videojuego), con propiedades como id, name, price, image y description. Esta clase permite crear objetos de juegos y manipularlos de manera eficiente.
Funciones clave:
getCart() y saveCart(): Estas funciones se encargan de recuperar y guardar el carrito en el localStorage.
updateCart(): Esta función actualiza la visualización del carrito en la interfaz de usuario.
savePurchaseData(): Guarda los detalles de la compra en el localStorage.
removeFromCart(): Elimina un producto del carrito y actualiza la vista.
5. Carga de productos:
Los productos se cargan desde un archivo JSON simulado (productos.json), lo que permite agregar nuevos juegos fácilmente sin necesidad de modificar el código. Cada juego tiene una imagen, descripción y precio que se muestran dinámicamente en la página.
Características principales:
Carrito de compras interactivo: Agrega productos al carrito y visualiza el precio total con un descuento del 10%.
Formulario de compra: Ingresa tus datos (nombre, dirección, email y tarjeta) para completar la compra.
Simulación de compra: El proceso de compra incluye una simulación con un 80% de éxito, enviando los datos al servidor.
Almacenamiento local: Los productos en el carrito y los detalles de la compra se almacenan en localStorage para que no se pierdan entre recargas de la página.


Tecnologías utilizadas:
HTML5 y CSS3: Para estructurar y estilizar la página.
JavaScript: Para manejar la lógica de la aplicación, incluyendo la gestión del carrito, la carga de productos y el proceso de compra.
Bootstrap: Para crear un diseño responsivo y adaptativo.
LocalStorage: Para almacenar el carrito de compras y los datos de la compra.
Estructura del proyecto
index.html: Contiene la estructura principal de la tienda y el carrito.
styles.css: Estilos personalizados para la aplicación.
index.js: Lógica de la aplicación, manejo del carrito y la compra.
productos.json: Archivo que contiene la información de los juegos (por ahora simulado como si fuera un archivo JSON, aunque los productos están codificados directamente en el script).

Instrucciones de uso
Abre la aplicación en tu navegador.
Navega entre los juegos y agrega los que más te gusten al carrito.
Al hacer clic en "Confirmar compra", ingresa tus datos y procesa la compra.
Si todo va bien, recibirás una confirmación de compra exitosa.
¡Gracias por usar House of Shooters! ¡Espero que disfrutes de la experiencia y encuentres los mejores juegos para tus horas de diversión!
