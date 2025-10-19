//// PARTE KEVIN
carritoBoton = function () {
  let texto;
  texto = recuperarTexto("buscadorCarrito");
  let indiceCarrito = buscarCarrito(texto);
  console.log(indiceCarrito);
  mostrarProductoDisponibles();
  if (indiceCarrito == null) {
    ocultarComponente("cambiarCantidadBoton");
    ocultarComponente("eliminarCarritoBoton");
    deshabilitarComponente("cantidadCarrito");
    mostrarComponente("agregarCarritoBoton");
    console.log("no existe el producto");
    let tabla = document.getElementById("tablaCarrito");
    tabla.innerHTML = "";
    mostrarTexto("totalCarrito", 0);
  } else {
    mostrarComponente("cambiarCantidadBoton");
    habilitarComponente("cantidadCarrito");
    ocultarComponente("agregarCarritoBoton");
    mostrarComponente("eliminarCarritoBoton");
    mostrarCantidadCarrito([carrito[indiceCarrito]]);
    mostrarProductoCarritoBuscado(indiceCarrito);
  }

  // mostrarCarrito();
};

mostrarProductoCarritoBuscado = function (indiceCarrito) {
  let cmpTabla = document.getElementById("tablaCarrito");
  cmpTabla.innerHTML = "";
  let contenidoTabla =
    "<table>" +
    " <thead><tr><th>Producto</th> <th>Cantidad</th><th>Subtotal</th> </tr></thead>";
  let elementosCarrito;
  elementosCarrito = carrito[indiceCarrito];
  contenidoTabla +=
    "<tr><td>" +
    elementosCarrito.nombre +
    "</td>" +
    "<td>" +
    elementosCarrito.cantidad +
    "</td>" +
    "<td>" +
    elementosCarrito.precio +
    "</td>" +
    "</tr>";

  contenidoTabla += "</table>";
  cmpTabla.innerHTML = contenidoTabla;
};

probarAgregarCarrito = function () {
  let texto;
  texto = recuperarTexto("buscadorCarrito");
  agregarAlCarrito(texto);
  mostrarCarrito();
};
// Función: añadir producto al carrito
function agregarAlCarrito(nombreProducto) {
  /*
      - Validar cantidad y stock disponible
      - Añadir producto o aumentar cantidad en carrito
      - Actualizar resumen y total del carrito
    */

  let productoEncontrado = buscarProducto(nombreProducto);
  if (productoEncontrado) {
    let productoNew = {};
    if (productoEncontrado.stock == 0) {
      return;
    }
    productoNew.nombre = productoEncontrado.nombre;
    productoNew.cantidad = productoEncontrado.stock;
    productoNew.precio = productoEncontrado.precio;
    let existeCarrito = buscarCarrito(productoNew.nombre);
    if (existeCarrito == null) {
      carrito.push(productoNew);
    } else {
      console.log("Producto existe en carrito");
    }
  } else {
    console.log("producto no encontrado");
    ocultarComponente("agregarCarritoBoton");
  }
}
buscarCarrito = function (nombreProductoCarrito) {
  let indexCarrito = null;
  for (i = 0; i < carrito.length; i++) {
    if (carrito[i].nombre == nombreProductoCarrito) {
      productoCarritoEncontrado = carrito[i];
      indexCarrito = i;
      break;
    }
  }

  return indexCarrito;
};
// Función: mostrar resumen del carrito
function mostrarCarrito() {
  /*
      - Mostrar tabla con productos en carrito, cantidades y subtotal
      - Mostrar total general
    */
  let cmpTabla = document.getElementById("tablaCarrito");
  cmpTabla.innerHTML = "";
  let contenidoTabla =
    "<table>" +
    " <thead><tr><th>Producto</th> <th>Cantidad</th><th>Subtotal</th> </tr></thead>";

  let elementosCarrito;
  for (let i = 0; i < carrito.length; i++) {
    elementosCarrito = carrito[i];
    contenidoTabla +=
      "<tr><td>" +
      elementosCarrito.nombre +
      "</td>" +
      "<td>" +
      elementosCarrito.cantidad +
      "</td>" +
      "<td>" +
      elementosCarrito.precio +
      "</td>" +
      "</tr>";
  }
  contenidoTabla += "</table>";
  cmpTabla.innerHTML = contenidoTabla;
  mostrarCantidadCarrito(carrito);
}

// Función: editar cantidad de producto en carrito

probarCambiarCantidad = function () {
  nombreProducto = recuperarTexto("buscadorCarrito");
  let indiceCarrito = buscarCarrito(nombreProducto);
  if (indiceCarrito != null) {
    editarCantidadCarrito(indiceCarrito);
  }
  mostrarProductoCarritoBuscado(indiceCarrito);
  mostrarCantidadCarrito([carrito[indiceCarrito]]);
};
function editarCantidadCarrito(index) {
  let newCuantity = recuperarFloat("cantidadCarrito");
  if (newCuantity >= 0) {
    carrito[index].cantidad = newCuantity;
  } else {
    console.log("cantidad no se puede añadir");
  }
  mostrarCarrito();
  /*
      - Validar nueva cantidad contra stock
      - Actualizar cantidad en carrito
      - Actualizar tabla y total
    */
}

mostrarCantidadCarrito = function (carrito) {
  let totalCarrito = 0;
  for (let i = 0; i < carrito.length; i++) {
    totalCarrito += carrito[i].cantidad * carrito[i].precio;
  }
  mostrarTexto("totalCarrito", totalCarrito);
};

eliminarCarritoBoton = function () {
  let texto;
  texto = recuperarTexto("buscadorCarrito");
  let indiceCarrito = buscarCarrito(texto);
  if (indiceCarrito != null) {
    eliminarDelCarrito(indiceCarrito);
    console.log("elimino del carrito");
  }
};

// Función: eliminar producto del carrito
function eliminarDelCarrito(index) {
  /*
      - Eliminar producto del carrito
      - Actualizar tabla y total
    */
  carrito.splice(index, 1);
  mostrarCarrito();
}

mostrarProductoDisponibles = function () {
  let productoDisponibles = document.getElementById("productosDisponibles");
  let contenidoLista = "";
  for (let i = 0; i < productos.length; i++) {
    contenidoLista += "<h5>" + productos[i].nombre + "</h5>";
  }
  productoDisponibles.innerHTML = contenidoLista;
};

buscarProducto = function (nombreProducto) {
  let productoEncontrado = "";
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].nombre == nombreProducto) {
      productoEncontrado = productos[i];
      break;
    }
  }
  return productoEncontrado;
};
