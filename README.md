Carrito de compras de juegos.
Este proyecto es una pequeña tienda en línea de juegos donde puedes agregar juegos a un carrito de compras, ver el total y confirmar la compra. Los precios de los juegos son generados de manera aleatoria dentro de un rango determinado, y todo el proceso se guarda en el almacenamiento local de tu navegador (localStorage).

Funcionalidades
Ver Juegos Disponibles:
Cada juego tiene un precio asignado aleatoriamente entre $29.99 y $99.99. Puedes ver estos precios en la interfaz.

Agregar al Carrito:
Puedes agregar juegos al carrito haciendo clic en el botón "Agregar al carrito" de cada juego. Los juegos que agregues se guardan en el carrito, que se mantiene incluso si recargas la página (gracias al uso de localStorage).

Ver Carrito:
El carrito de compras se muestra con todos los juegos agregados y el precio total de los mismos. Además, cada juego tiene un botón para ser eliminado si cambias de opinión.

Confirmar Compra:
Al hacer clic en el botón "Confirmar compra", se simula una compra. Si todo va bien, se muestra un mensaje de éxito y se limpia el carrito. Si hay algún problema, se muestra un mensaje de error.

Simulación de Comunicación con el Servidor:
Al confirmar la compra, el carrito se envía a un servidor simulado utilizando fetch (en este caso, una URL de ejemplo de JSONPlaceholder). Este paso simula el proceso de hacer un pedido en línea.

Cómo Funciona
Creación de Juegos:
Los juegos se crean con un ID y nombre, y se les asigna un precio aleatorio cuando se cargan en la página.

Carrito:
El carrito se guarda en el localStorage de tu navegador. Cada vez que agregas o eliminas un juego, el carrito se actualiza automáticamente y se muestra en la interfaz.

Proceso de Compra:
Al hacer clic en el botón "Confirmar compra", se simula un proceso de compra que tiene un 80% de probabilidades de ser exitoso. Si la compra es exitosa, el carrito se limpia; si hay un error, se muestra un mensaje de fallo.

Envío a Servidor:
La información del carrito se envía a un servidor simulado usando un fetch con un POST. Esto simula lo que sería una llamada real a una API de un sistema de compras en línea.

Cómo Probar el Proyecto
Clona el repositorio en tu computadora.
Abre el archivo index.html en tu navegador.
Juega con los botones "Agregar al carrito", "Eliminar" y "Confirmar compra".
¿Cómo Funciona el Código?
Juego: Es la clase que representa cada juego. Se encarga de generar precios aleatorios y de manejar la lógica para agregar y eliminar juegos del carrito.
localStorage: Usamos localStorage para almacenar los juegos en el carrito, lo que nos permite mantener el carrito actualizado entre sesiones (incluso si recargas la página).
fetch: Cuando confirmas la compra, el carrito se envía a un servidor simulado con fetch para procesar la compra.
Tecnologías Usadas
JavaScript (para la lógica de la tienda)
HTML y CSS (para la estructura y el estilo de la página)
localStorage (para almacenar el carrito de compras)
