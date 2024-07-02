document.addEventListener('DOMContentLoaded', function () {
  const togglePassword = document.querySelector('#togglePassword');
  const password = document.querySelector('#password');
  const loginForm = document.getElementById('loginForm');
  const userIcon = document.querySelector('.header__action-icon');
  const userMenu = document.getElementById('userMenu');
  const cartIcon = document.getElementById('cartIcon');

  const cartModal = document.getElementById('cartModal');

  const cartItemsContainer = document.getElementById('cartItems');
  const totalPriceElement = document.getElementById('totalPrice');
  const cartCount = document.getElementById('cartCount');

  const productModal = document.getElementById('productModal');

  const payModal = document.getElementById('payModal');

  const searchButton = document.getElementById('searchButton');
  const searchInput = document.getElementById('searchInput');
  const productList = document.getElementById('productList');
  const sortOptions = document.getElementById('sortOptions');
  const overlay = document.getElementById('overlay');
      let cart = [];

  // Mostrar/Ocultar el menú desplegable
  userIcon.addEventListener('click', function () {
      userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
  });

  // Redirigir al hacer clic en "Cerrar sesión"
  document.getElementById('logout').addEventListener('click', function () {
      window.location.href = 'Inicio.html';
  });

  // Ocultar el menú desplegable al hacer clic fuera de él
  window.addEventListener('click', function (event) {
      if (event.target !== userIcon && !userIcon.contains(event.target) && event.target !== userMenu && !userMenu.contains(event.target)) {
          userMenu.style.display = 'none';
      }
  });

  // Mostrar/Ocultar el modal del carrito
  cartIcon.addEventListener('click', function () {
      cartModal.style.display = 'block';
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
  });

  // Ocultar el modal al hacer clic fuera de él
  overlay.addEventListener('click', function (event) {
      if (true) {
          cartModal.style.display = 'none';
          productModal.style.display = 'none';
          payModal.style.display = 'none';
          event.target.style.display = 'none';
          overlay.style.display = 'none';

          document.body.style.overflow = '';
      }
  });

  // Mostrar detalles del producto en el modal al hacer clic en el card del producto
  document.querySelectorAll('.product').forEach(product => {
      product.addEventListener('click', function () {
          const name = product.getAttribute('data-name');
          const price = product.getAttribute('data-price');
          const id = product.getAttribute('data-id');
          const imgSrc = product.querySelector('img').getAttribute('src');

          const modalProduct = document.getElementById('productModal');
                modalProduct.setAttribute('data-id', id); 

          document.getElementById('modalImage').setAttribute('src', imgSrc);
          document.getElementById('modalName').textContent = name;
          document.getElementById('modalPrice').textContent = `Precio: S/ ${price}`;
          productModal.style.display = 'block';
          overlay.style.display = 'block';
          document.body.style.overflow = 'hidden';
      });
  });

  // Añadir al carrito
  document.getElementById('addToCart').addEventListener('click', function () {
      const name = document.getElementById('modalName').textContent;
      const price = parseFloat(document.getElementById('modalPrice').textContent.replace('Precio: S/ ', ''));
      const quantity = parseInt(document.getElementById('quantity').value);
      const idproducto= document.getElementById('productModal').getAttribute('data-id');


      const existingProductIndex = cart.findIndex(product => product.name === name);

      if (existingProductIndex > -1) {
          cart[existingProductIndex].quantity += quantity;
      } else {
          cart.push({ name, price, quantity, idproducto });
      }

      updateCart();
      productModal.style.display = 'none';
      overlay.style.display = 'none';
      document.body.style.overflow = '';
  });


  let botonPagar = document.getElementById('pagarPedido')
  const venta ={
    // nombre:'',
    // direccion: '',
    // celular: '',
    productos: [],
    total: ''
  }

  botonPagar.onclick = enviarPedido;

  async function enviarPedido(){
    
      let contenedorDatos = document.getElementById('payModal');
      var inputs = document.querySelectorAll("#payModal input");
      var listaProductos = document.querySelectorAll(".cart__item");
      var totalPedido = document.querySelector("#totalPrice");
  
      listaProductos = Array.from(listaProductos).map( function(item) {
        let producto = {
          nombre: '',
          cantidad:'',
          precioUnitario : '',
          idproducto : ''
        }
        // Eliminar cualquier espacio en blanco adicional
        textoItem = item.textContent.replace("Quitar", "").trim();
        // Dividir el texto en partes
        let parts = textoItem.split(" - ");
        // Obtener el nombre del producto
        let nombre = parts[0];
        // Obtener la parte que contiene el precio y la cantidad
        let precioYCantidad = parts[1].split(" x ");
        // Convertir el precio a número
        let precio = parseFloat(precioYCantidad[0].replace("S/ ", ""));
        // Convertir la cantidad a número
        let cantidad = parseInt(precioYCantidad[1]);
        
        let id = item.getAttribute('data-idproducto');
        // Devolver un objeto con los datos
        producto.nombre = nombre;
        producto.cantidad = cantidad;  
        producto.precioUnitario = precio;
        producto.idproducto = id;
        return producto;
      });
  
      // venta.nombre = inputs[0].value;
      // venta.direccion = inputs[1].value;
      // venta.celular = inputs[2].value;
      venta.productos = listaProductos;
      let stringPrecioTotal = totalPedido.textContent;
      venta.total = parseFloat(stringPrecioTotal.match(/[0-9]+\.[0-9]+/)[0]);
  
      const datos  = new FormData();
      // datos.append('nombre', venta.nombre)
      // datos.append('direccion', venta.direccion)
      // datos.append('celular', venta.celular)
      datos.append('productos',  JSON.stringify(venta.productos))
      datos.append('total', venta.total)
  
      // console.log([...datos]);
      try {
        // Petición hacia la api
        const url = 'http://localhost:3000/api/pedido'
        const respuesta = await fetch(url, {
            method: 'POST',
            body: datos
        });
  
        const resultado = await respuesta.json();
        // console.log(resultado);
        
        if(resultado.resultado) {
            Swal.fire({
                icon: 'success',
                title: 'Pedido Registrado',
                text: 'Los detalles seran enviados al whatsapp del número registrado',
                button: 'OK'
            }).then( () => {
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            })
        }
    } catch (error) {
        console.log(error)
    }
 
        cart = [];
        updateCart();
        payModal.style.display ='none';
        cartModal.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    
  }

  // Actualizar carrito
  function updateCart() {
      cartItemsContainer.innerHTML = '';
      let totalItems = 0;
      let total = 0;

      cart.forEach(product => {
          const item = document.createElement('li');
          item.classList.add('cart__item');
          item.dataset.idproducto = product.idproducto;

          item.innerHTML = `<h5 class="cart__item-titulo">${product.name}</h5> - S/ ${product.price.toFixed(2)} x ${product.quantity}
          <button class="remove-item" data-name="${product.name}">Quitar</button>`;
          cartItemsContainer.appendChild(item);
          total += product.price * product.quantity;
          totalItems += product.quantity;
      });

      totalPriceElement.textContent = `Total: S/ ${total.toFixed(2)}`;
      cartCount.textContent = totalItems;
  }

  // Función para eliminar un ítem del carrito
  function removeItemFromCart(productName) {
      const itemIndex = cart.findIndex(product => product.name === productName);
      if (itemIndex > -1) {
          cart.splice(itemIndex, 1);
      }
      updateCart();
  }

  // Evento para manejar la eliminación de un ítem
  cartItemsContainer.addEventListener('click', function(event) {
      if (event.target.classList.contains('remove-item')) {
          const productName = event.target.getAttribute('data-name');
          removeItemFromCart(productName);
      }
  });

  // Ocultar el modal del carrito y producto
  document.querySelectorAll('.close').forEach(closeBtn => {
      closeBtn.addEventListener('click', function () {
          cartModal.style.display = 'none';
          productModal.style.display = 'none';
          overlay.style.display = 'none';
          document.body.style.overflow = '';
      });
  });

  // Pagar
  document.getElementById('checkout').addEventListener('click', function () {
      
      
      payModal.style.display ='block'
      cartModal.style.display = 'none';
      if(false){
        cart = [];
        updateCart();
        
        overlay.style.display = 'none';
        document.body.style.overflow = '';
      }
      
  });

  // Cancelar
  document.getElementById('cancel').addEventListener('click', function () {
      cartModal.style.display = 'none';
      overlay.style.display = 'none';
      document.body.style.overflow = '';
  });

  // Buscar productos
  searchButton.addEventListener('click', function () {
      const searchText = searchInput.value.toLowerCase();
      const products = document.querySelectorAll('.product');
      products.forEach(product => {
          const name = product.getAttribute('data-name').toLowerCase();
          if (name.includes(searchText)) {
              product.style.display = 'block';
          } else {
              product.style.display = 'none';
          }
      });
  });

  // Ordenar productos
  sortOptions.addEventListener('change', function () {
      const option = sortOptions.value;
      const productsArray = Array.from(document.querySelectorAll('.product'));

      if (option === 'name') {
          productsArray.sort((a, b) => {
              const nameA = a.getAttribute('data-name').toLowerCase();
              const nameB = b.getAttribute('data-name').toLowerCase();
              return nameA.localeCompare(nameB);
          });
      } else if (option === 'price') {
          productsArray.sort((a, b) => {
              const priceA = parseFloat(a.getAttribute('data-price'));
              const priceB = parseFloat(b.getAttribute('data-price'));
              return priceA - priceB;
          });
      }

      productsArray.forEach(product => {
          productList.appendChild(product);
      });
  });
});




//Slider
const slider = document.querySelector('.slider');
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prevBtn = document.querySelector('.prevBtn');
const nextBtn = document.querySelector('.nextBtn');
const dotsContainer = document.querySelector('.dots-container');

let counter = 0;
const slideWidth = images[0].clientWidth;

slides.style.transform = `translateX(${-slideWidth * counter}px)`;

function nextSlide() {
  if (counter >= images.length - 1) {
    counter = 0;
  } else {
    counter++;
  }
  updateSlider();
}

function prevSlide() {
  if (counter <= 0) {
    counter = images.length - 1;
  } else {
    counter--;
  }
  updateSlider();
}

function goToSlide(index) {
  counter = index;
  updateSlider();
}

function updateSlider() {
  slides.style.transition = "transform 0.5s ease-in-out";
  slides.style.transform = `translateX(${-slideWidth * counter}px)`;
  updateDots();
}

function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    if (index === counter) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Crear los puntos indicadores
images.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dotsContainer.appendChild(dot);

  dot.addEventListener('click', () => {
    goToSlide(index);
  });
});

// Actualizar los puntos indicadores al cambiar automáticamente
function autoSlide() {
  nextSlide();
  updateDots();
}

let slideInterval = setInterval(autoSlide, 3000);

slider.addEventListener('mouseenter', () => {
  clearInterval(slideInterval);
});

slider.addEventListener('mouseleave', () => {
  slideInterval = setInterval(autoSlide, 3000);
});

//animacion
document.addEventListener("DOMContentLoaded", function() {
  var tituloAnimado = document.getElementById('tituloAnimado');
  var texto = tituloAnimado.textContent.trim();
  tituloAnimado.innerHTML = "";

  texto.split(" ").forEach(function(word, index, array) {
    if (index > 0) {
      tituloAnimado.appendChild(document.createTextNode('\u00A0')); // Add non-breaking space
    }
    var spanWord = document.createElement('span');
    tituloAnimado.appendChild(spanWord);

    // Add a span for each letter in the word
    word.split("").forEach(function(char, charIndex, charArray) {
      var spanChar = document.createElement('span');
      spanChar.textContent = char;
      spanChar.style.animation = 'desplazamiento 0.5s forwards cubic-bezier(0.5, 0, 0.5, 1)';
      spanChar.style.animationDelay = (index + charIndex * 0.1) + 's'; // Adjust delay for each letter
      spanWord.appendChild(spanChar);
    });
  });
});

//abrir modales de ver y editar perfil
document.addEventListener("DOMContentLoaded", function() {
  // Obtener los elementos de los modales y los botones de cierre
  const verPerfilModal = document.getElementById('verPerfilModal');
  const editarPerfilModal = document.getElementById('editarPerfilModal');
  const closeVerPerfilModal = document.getElementById('closeVerPerfilModal');
  const closeEditarPerfilModal = document.getElementById('closeEditarPerfilModal');
  const overlay = document.getElementById('overlay');
  // Obtener los enlaces para abrir los modales
  const verPerfilLink = document.getElementById('verPerfil');
  const editarPerfilLink = document.getElementById('editarPerfil');

  // Función para abrir el modal de ver perfil
  verPerfilLink.addEventListener('click', function() {
      verPerfilModal.style.display = 'block';
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Evitar el desplazamiento del cuerpo mientras el modal está abierto
  });

  // Función para abrir el modal de editar perfil
  editarPerfilLink.addEventListener('click', function() {
      editarPerfilModal.style.display = 'block';
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Evitar el desplazamiento del cuerpo mientras el modal está abierto
  });

  // Funciones para cerrar los modales al hacer clic en el botón de cierre
  closeVerPerfilModal.addEventListener('click', function() {
      verPerfilModal.style.display = 'none';
      overlay.style.display = 'none';
      document.body.style.overflow = ''; // Restablecer el desplazamiento del cuerpo al cerrar el modal
  });

  closeEditarPerfilModal.addEventListener('click', function() {
      editarPerfilModal.style.display = 'none';
      overlay.style.display = 'none';
      document.body.style.overflow = ''; // Restablecer el desplazamiento del cuerpo al cerrar el modal
  });

  // Funciones para cerrar los modales al hacer clic fuera de ellos
  window.addEventListener('click', function(event) {
      if (event.target === overlay) {
          verPerfilModal.style.display = 'none';
          editarPerfilModal.style.display = 'none';
          overlay.style.display = 'none';
          document.body.style.overflow = ''; // Restablecer el desplazamiento del cuerpo al cerrar el modal
      }
  });

  // Función para cerrar los modales al presionar la tecla Escape
  window.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
          verPerfilModal.style.display = 'none';
          editarPerfilModal.style.display = 'none';
          overlay.style.display = 'none';
          document.body.style.overflow = ''; // Restablecer el desplazamiento del cuerpo al cerrar el modal
      }
  });
});