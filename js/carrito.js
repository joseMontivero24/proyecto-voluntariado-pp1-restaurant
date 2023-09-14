// FUNCIONAMIENTO DEL CARRITO
//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaComida = document.querySelector('#lista-comida');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners() {
   // para agregar un comida al precionar 'agregar al carrito'
   listaComida.addEventListener('click', agregarComida);

   // para eliliminar la comida
   carrito.addEventListener('click', eliminarComida);

   // muestra los comida del local storage
   document.addEventListener('DOMContentLoaded', () => {
      articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

      carritoHTML();
   })


   // para vaciar el carrito con el boton
   vaciarCarritoBtn.addEventListener('click', () => {
      articulosCarrito = []; // reseteamos el arreglo

      limpiarHTML(); // para eliminar todo el html del carrito

   })
}

// funciones

function agregarComida(e) {
   e.preventDefault();

   if (e.target.classList.contains('agregar-carrito') ) {
     
      const comidaSeleccionada = e.target.parentElement;
      leerDatosComida(comidaSeleccionada);
   }
}

// elimina un curso del carrito
function eliminarComida(e) {
   e.preventDefault();
   
   if (e.target.classList.contains('borrar-comida')) {
      const comidaId = e.target.getAttribute('data-id');

      //para eliminar del arreglo 
      articulosCarrito = articulosCarrito.filter(comida => comida.id !== comidaId );

      carritoHTML(); // para iterar sobre el carrito y mostar el html

   }
}



// para leer el doc html y extraer su info
function leerDatosComida(comida) {
   // console.log(comida);

   // objeto con el contenido de cada comida
   const infoComida = {
      imagen: comida.querySelector('img').src,
      titulo: comida.querySelector('div h4').textContent,
      precio: comida.querySelector('.flex .price span').textContent,
      id: comida.querySelector('a').getAttribute('data-id'),
      cantidad: 1

   }
   
   // para revisar si uelemento ya exixte en el carrito
   const existe = articulosCarrito.some( comida => comida.id === infoComida.id );
   if (existe) {
      // actualizamos la cantidad
      const comida = articulosCarrito.map( comida => {
         if (comida.id === infoComida.id) {
            comida.cantidad++;
            return comida; // retorna el objeto actualizado
         } else {
            return comida; // retorna los objetos que no son los duplicados
         }
      });
      articulosCarrito = [...comida];
   } else {
      //agrega elementos al arreglo
      articulosCarrito = [...articulosCarrito, infoComida];
   }
   console.log(articulosCarrito);

   carritoHTML();
}


// muestra el carrito en el html
function carritoHTML() {
   // limpiar el html
   limpiarHTML();


   articulosCarrito.forEach( comida => {
      const row = document.createElement('tr');
      row.innerHTML = `
         <td>
            <img src="${comida.imagen}" width="100px">
         </td>
         <td>${comida.titulo}</td>
         <td>${comida.precio}</td>
         <td>${comida.cantidad}</td>
         <td>
            <a href="#" class="borrar-comida" data-id="${comida.id}">X</a>
         </td>
      `;

      // para agregar el html del carrito en el tbody vacio
      contenedorCarrito.appendChild(row);
   });


   // agregar el carrito al storage
   sincronizarStorage();
}

function sincronizarStorage() {
   localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}


// eliminar los cursos del tbody
function limpiarHTML() {
   
   while(contenedorCarrito.firstChild) {
      contenedorCarrito.removeChild(contenedorCarrito.firstChild)
   }
}


