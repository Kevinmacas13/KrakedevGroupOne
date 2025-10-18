// Lista base de productos
const productos = [
  {
    nombre: "Camisa",
    descripcion: "Camisa blanca de algodón",
    categoria: "Ropa",
    precio: 25.99,
    stock: 50,
  },
  {
    nombre: "Pantalón",
    descripcion: "Pantalón azul jeans",
    categoria: "Ropa",
    precio: 40.0,
    stock: 30,
  },
  {
    nombre: "Zapatos",
    descripcion: "Zapatos deportivos",
    categoria: "Calzado",
    precio: 60.5,
    stock: 20,
  },
];

// Lista base de categorías
const categorias = [
  { nombre: "Ropa", descripcion: "Prendas de vestir" },
  { nombre: "Calzado", descripcion: "Zapatos, sandalias y más" },
];

const carrito = [
  { nombre: "Camisa", cantidad: 2, precio: 25.99 },
  { nombre: "Zapatos", cantidad: 1, precio: 60.5 },
];

const ventas = [
  {
    cliente: {
      nombre: "Juan Pérez",
      email: "juan.perez@example.com",
      telefono: "0991234567",
      direccion: "Av. Siempre Viva 123",
    },
    total: 112.48,
  },
  {
    cliente: {
      nombre: "María López",
      email: "maria.lopez@example.com",
      telefono: "0987654321",
      direccion: "Calle Falsa 456",
    },
    total: 40.0,
  },
];
// Función: agregar o actualizar producto




function ejecutarEliminarProducto() {
  let valueNombreP = recuperarTexto('eliminarProducto');
  let valueIndex;
  if(valueNombreP==null || valueNombreP.length==0){
    mostrarTexto('lblErrorElim', 'Ingrese un nombre de producto válido');
    return;
  }else{
    mostrarTexto('lblErrorElim', '');
    for (let i = 0; i < productos.length; i++) {
    if (productos[i].nombre == valueNombreP) {
      mostrarTexto('lblErrorElim', '');
      productos.splice(i, 1);
      break;
    } else {
      mostrarTexto('lblErrorElim', 'Producto no encontrado');
    }

  }
  mostrarProductos(productos);
  }
  
}

function siempreTabla(){
  mostrarProductos(productos);
}

function agregarProducto() {
  let valueNombre = recuperarTexto('txtNombre');
  let valueDescripción = recuperarTexto('txtDescripción');
  let valueCategoria = recuperarTexto('txtCategoría');
  let valuePrecio = recuperarFloat('txtPrecio');
  let valueStock = recuperarInt('txtStock');
  let erroresNombre = ''
  let esValido = true;

  if (valueNombre == null || valueNombre.length == 0) {
    erroresNombre += 'El nombre no puede quedar vacío.'
    mostrarTexto('lblErrorNombre', erroresNombre)
    esValido = false;
  } else {
    mostrarTexto('lblErrorNombre', '')
  }

  if (esMayuscula(valueNombre.charAt(0))) {
    mostrarTexto('lblErrorNombre', '')
    for (let i = 1; i < valueNombre.length; i++) {
      let char = valueNombre.charAt(i);
      if (!esMinuscula(char)) {
        erroresNombre += '\nEl nombre debe iniciar con mayúscula y el resto en minúscula.'
        mostrarTexto('lblErrorNombre', erroresNombre)
        esValido = false;
        break;
      } else {
        mostrarTexto('lblErrorNombre', '')
      }
    }
  } else {
    erroresNombre += '\nEl nombre debe iniciar con mayúscula y el resto en minúscula.'
    mostrarTexto('lblErrorNombre', erroresNombre)
    esValido = false;
  }


  if (valueDescripción == null || valueDescripción.length == 0) {
    mostrarTexto('lblErrorDescripción', 'La descripción es obligatoria y debe ser válida.')
    esValido = false;
  } else {
    mostrarTexto('lblErrorDescripción', '')
    for (let i = 0; i < valueDescripción.length; i++) {
      let char = valueDescripción.charAt(i);
      if (esDigito(char)) {
        mostrarTexto('lblErrorDescripción', 'La descripción es obligatoria y debe ser válida.')
        esValido = false;
        break;
      } else {
        mostrarTexto('lblErrorDescripción', '')
      }

    }
  }


  if (valueCategoria == null || valueCategoria.length == 0) {
    mostrarTexto('lblErrorCategoría', 'La categoría es obligatoria y debe tener formato válido.')
    esValido = false;
  } else {
    mostrarTexto('lblErrorCategoría', '')
    for (let i = 0; i < valueCategoria.length; i++) {
      let char = valueCategoria.charAt(i);
      if (esDigito(char)) {
        mostrarTexto('lblErrorCategoría', 'La categoría es obligatoria y debe tener formato válido.')
        esValido = false;
        break;
      } else {
        mostrarTexto('lblErrorCategoría', '')
      }
    }
  }

  if (valuePrecio == null || isNaN(valuePrecio) || valuePrecio <= 0) {
    mostrarTexto('lblErrorPrecio', 'Ingrese un precio válido mayor o igual a cero.')
    esValido = false;
  } else {
    mostrarTexto('lblErrorPrecio', '')
  }

  if (valueStock == null || isNaN(valueStock) || valueStock <= 0) {
    mostrarTexto('lblErrorStock', 'Ingrese un stock válido (entero, 0 o más).')
    esValido = false;
  } else {
    mostrarTexto('lblErrorStock', '')
  }

  if (esValido == true) {

    for (let i = 0; i < productos.length; i++) {
      if (productos[i].nombre == valueNombre) {
        productos[i].descripcion = valueDescripción;
        productos[i].categoria = valueCategoria;
        productos[i].precio = valuePrecio;
        productos[i].stock = valueStock;
        break;
      } else {
        let nuevoProducto = {
          nombre: valueNombre,
          descripcion: valueDescripción,
          categoria: valueCategoria,
          precio: valuePrecio,
          stock: valueStock,
        };

        productos.push(nuevoProducto);
        break;
      }

    }

    limpiar();
    mostrarProductos(productos);
  }
}
limpiar = function () {
  mostrarTextoEnCaja('txtNombre', '');
  mostrarTextoEnCaja('txtDescripción', '');
  mostrarTextoEnCaja('txtCategoría', '');
  mostrarTextoEnCaja('txtPrecio', '');
  mostrarTextoEnCaja('txtStock', '');

  mostrarTexto('lblErrorNombre', '');
  mostrarTexto('lblErrorDescripción', '');
  mostrarTexto('lblErrorCategoría', '');
  mostrarTexto('lblErrorPrecio', '');
  mostrarTexto('lblErrorStock', '');

}

// Función: mostrar productos en la tabla
function mostrarProductos(productos) {
  let cmpTabla = document.getElementById('tablaProductos');
  cmpTabla.innerHTML = '';
  let contenidoTabla = '<table><tr>' +
    '<th>NOMBRE</th>' +
    '<th>DESCRIPCIÓN</th>' +
    '<th>CATEGORÍA</th>' +
    '<th>PRECIO</th>' +
    '<th>STOCK</th>' +
    '<th>PRECIO IVA 12%</th>' +
    '</tr>';

  let elementoProductos;
  for (let i = 0; i < productos.length; i++) {
    elementoProductos = productos[i];
    contenidoTabla += '<tr><td>' + elementoProductos.nombre + '</td>'
      + '<td>' + elementoProductos.descripcion + '</td>'
      + '<td>' + elementoProductos.categoria + '</td>'
      + '<td>' + elementoProductos.precio + '</td>'
      + '<td>' + elementoProductos.stock + '</td>'
      + '<td>' + (elementoProductos.precio + ((elementoProductos.precio / 100) * 12)).toFixed(2) + '</td>'
      + '</tr>';
  }
  contenidoTabla += '</table>';
  cmpTabla.innerHTML = contenidoTabla;
  actualizarEstadisticasProductos()
}



/*
    - Confirmar acción con el usuario
    - Remover producto de la lista productos
    - Actualizar tabla y estadísticas
  */

// Función: actualizar estadísticas de productos
function actualizarEstadisticasProductos() {
  let xmpTotalProductos = document.getElementById('totalProductos');
  let xmpStockTotal = document.getElementById('stockTotal');
  let xmpValorInventario = document.getElementById('valorInventario');
  let elementoProductos;
  let stockTotal = 0;
  let valorInventario = 0;
  for (let i = 0; i < productos.length; i++) {
    elementoProductos = productos[i];
    stockTotal += elementoProductos.stock;
    valorInventario += elementoProductos.precio * elementoProductos.stock;
  }
  xmpTotalProductos.innerHTML = productos.length
  xmpStockTotal.innerHTML = stockTotal
  xmpValorInventario.innerHTML = valorInventario.toFixed(2)
}

// Función: agregar categoría
function agregarCategoria() {
  let valueCategoria = recuperarTexto("nombreCategoria");
  let valueDescripción = recuperarTexto("descripcionCategoria");
  let error = ""
  let esCorrecto = true;

  if (valueCategoria == null || valueCategoria.length == 0) {
    error += "El nombre no puede quedar vacio."
    mostrarTexto("errorNombreCategoria", error);
    esCorrecto = false;
  } else {
    mostrarTexto("errorNombreCategoria", " ");
  }
  if (esMayuscula(valueCategoria.charAt(0))) {
    mostrarTexto("errorNombreCategoria", " ");
    for (let i = 1; i < valueCategoria.length; i++) {
      let cher = valueCategoria.charAt(i);
      if (!esMinuscula(cher)) {
        error += '\nEl nombre debe iniciar con mayúscula y el resto en minúscula.'
        mostrarTexto("errorNombreCodigo", error);
        esCorrecto = false;
        break;
      } else {
        mostrarTexto("errorNombreCodigo", " ");
      }
    }
  } else {
    error += '\nEl nombre debe iniciar con mayúscula y el resto en minúscula.'
    mostrarTexto('errorNombreCodigo', error)
    esCorrecto = false;
  }

  if (valueDescripción == null || valueDescripción.length == 0) {
    mostrarTexto('errorDescripcionCategoria', 'La categoría es obligatoria y debe tener formato válido.')
    esCorrecto = false;
  } else {
    mostrarTexto('errorDescripcionCategoria', '')
    for (let i = 0; i < valueDescripción.length; i++) {
      let char = valueDescripción.charAt(i);
      if (esDigito(char)) {
        mostrarTexto('errorDescripcionCategoria', 'La categoría es obligatoria y debe tener formato válido.')
        esCorrecto = false;
        break;
      } else {
        mostrarTexto('errorDescripcionCategoria', '')
      }
    }
  }
  if(esCorrecto==true){
    for(let i=0;i<categorias.length;i++){
      if(categorias[i].nombre==valueCategoria){
        categorias[i].descripcion==valueDescripción
        break;
      }else{
        let nuevoProducto={
          nombre: valueCategoria,
          descripcion: valueDescripción,
      }
      categorias.push(nuevoProducto);
      break;
    }
  }

}
limpiarCat();
mostrarCategorias(categorias);
}

limpiarCat = function () {
  mostrarTextoEnCaja('nombreCategoria', '');
  mostrarTextoEnCaja('descripcionCategoria', '');

  mostrarTexto('errorNombreCategoria', '');
  mostrarTexto('errorDescripcionCategoria', '');
}
 

// Función: mostrar categorías
function mostrarCategorias() {
  let cmpTabla = document.getElementById('listaCategorias');
  cmpTabla.innerHTML = '';
  let contenidoTabla = '<table><tr>' +
    '<th>NOMBRE</th>' +
    '<th>DESCRIPCIÓN</th>' +
    '</tr>';
  let elementoCategorias;
  for (let i = 0; i < categorias.length; i++) {
    elementoCategorias = categorias[i];
    contenidoTabla += '<tr><td>' + elementoCategorias.nombre + '</td>'+
       '<td>' + elementoCategorias.descripcion + '</td>'+
       '</tr>';
  }
  contenidoTabla += '</table>';
  cmpTabla.innerHTML = contenidoTabla;
}

// Función: eliminar categoría
function eliminarCategoria() {
  let valueNombreP=recuperarTexto("descripcionCategoriaElim");
  if(valueNombreP==null||valueNombreP==0){
    mostrarTexto("errorDescripcionCategoriaElim","Ingrese un producto valido");
    return;
  }else{
    mostrarTexto("errorDescripcionCategoriaElim"," ");
    for(let i=0;i<categorias.length;i++){
      if(categorias[i].nombre==valueNombreP){
        mostrarTexto("errorDescripcionCategoriaElim"," ");
        categorias.splice(i,1);
        break;
      }else{
        mostrarTexto("errorDescripcionCategoriaElim","Producto no encontrado");
      }
    }
    mostrarCategorias(categorias);
  }
}

// Función: mostrar productos disponibles para añadir al carrito
function mostrarProductosDisponibles() {
  /*
      - Mostrar lista de productos con botón para añadir al carrito
    */
}

// Función: añadir producto al carrito
function agregarAlCarrito(nombreProducto) {
  cmpCategoríaNombre = recuperarTexto('txtCategoriaNombre');
  cmpCategoríaDescripción = recuperarTexto('txtCategoriaDescripción');
  if(cmpCategoríaNombre==null || cmpCategoríaNombre.length==0){
    mostrarTexto('lblErrorCatNombre', 'El nombre de la categoría no puede quedar vacío.');
    return;
  }else{
    mostrarTexto('lblErrorCatNombre', '');
  }
}

// Función: mostrar resumen del carrito  
function mostrarCarrito() {
  /*
      - Mostrar tabla con productos en carrito, cantidades y subtotal
      - Mostrar total general
    */
}

// Función: editar cantidad de producto en carrito
function editarCantidadCarrito(index) {
  /*
      - Validar nueva cantidad contra stock
      - Actualizar cantidad en carrito
      - Actualizar tabla y total
    */
}

// Función: eliminar producto del carrito
function eliminarDelCarrito(index) {
  /*
      - Eliminar producto del carrito
      - Actualizar tabla y total
    */
}

// Función: guardar datos cliente

// Función: guardar datos cliente
function guardarDatosCliente() {
  /*
      - Obtener y validar campos del cliente (nombre, email, teléfono, dirección)
      - Guardar datos para la compra
    */

  let valorNombre=recuperarTexto("nombreCliente");
  let valorEmail=recuperarTexto("emailCliente");
  let valorTelefono=recuperarTexto("telefonoCliente");
  let valorDireccion=recuperarTexto("direccionCliente");

if((validarCajaTextoNombre(valorNombre)) && (validarCajaTextoEmail(valorEmail)) && (validarCajaTextoTelefono(valorTelefono)) && (validarCajaTextoDireccion(valorDireccion))){
  let nuevoCliente={};
  nuevoCliente.nombre=valorNombre;
  nuevoCliente.email=valorEmail;
  nuevoCliente.telefono=valorTelefono;
  nuevoCliente.direccion=valorDireccion;
  ventas.push(nuevoCliente);
  alert("cliente registrado exitoso  ");
}else{
}

    


}

buscarcliente = function(nombrecliente) {
  let elementoCliente;
  let clienteEncontrado = null;
  for (let i = 0; i < (ventas.cliente).length; i++) {
    elementoCliente = ventas.cliente[i];
      if (elementoCliente.nombre == nombrecliente) {
        clienteEncontrado = elementoCliente;
        alert("cliente enonctrado");
          break;
      }
  }
  return clienteEncontrado;
};


//validaciones 

//funcion validar  caja texto de nombre 
validarCajaTextoNombre = function(nombre) {
  let longitudNombre = nombre.length;
  let error = false;
  if ((nombre == "" || nombre ==null)) {
      mostrarTexto("errorNombreCliente", "Campo obligatorio*");
      error = true;
  } else if (esCadenaMayuscula(nombre) == false) {
      mostrarTexto("errorNombreCliente", "Se permite solo mayusculas");
      error = true;
  } else {
      mostrarTexto("errorNombreCliente", "");
  }
  return !error;
};

//funcion validar  caja email 
validarCajaTextoEmail = function(nombre) {
  let error = false;
  if ((nombre == "" || nombre ==null)) {
      mostrarTexto("errorEmailCliente", "Campo obligatorio*");
      error = true;
  } else {
      mostrarTexto("errorEmailCliente", "");
  }
  return !error;
};

//funcion validar 9 caracteres digitos CEULAR
validarCajaTextoTelefono = function(telefono) {
  let longitudtelefono = telefono.length;
  let error = false;

  if ((telefono == "")) {
      mostrarTexto("errorTelefonoCliente", "Campo obligatorio*");
      error = true;
  } else if ((longitudtelefono != 9)) {
      mostrarTexto("errorTelefonoCliente", "celular debe tener 9 digitos");
      error = true;
  } else if (isNaN(telefono)) {
      mostrarTexto("errorTelefonoCliente", "Ingresar solo digitos");
      error = true;
  } else {
      mostrarTexto("errorTelefonoCliente", "");
  }

  return !error;
};


//funcion validar  caja direccion 
validarCajaTextoDireccion = function(nombre) {
  let error = false;
  if ((nombre == "" || nombre ==null)) {
      mostrarTexto("errorDireccionCliente", "Campo obligatorio*");
      error = true;
  } else {
      mostrarTexto("errorDireccionCliente", "");
  }
  return !error;
};


//funcion es mayuscula
esCadenaMayuscula = function(cadena) {
  let codigoLetra;
  let esMayuscula = true;
  for (let i = 0; i < cadena.length; i++) {
      codigoLetra = cadena.charCodeAt(i);
      if ((codigoLetra < 65) || (codigoLetra > 90)) {
          esMayuscula = false;
          break;
      }
  }
  return esMayuscula;
};




// Función: finalizar compra
function finalizarCompra() {
  /*
      - Validar carrito y datos cliente completos
      - Crear registro de venta con productos, cliente, total y fecha
      - Actualizar stock de productos vendidos
      - Vaciar carrito
      - Actualizar tablas y estadísticas
      - Mostrar mensaje éxito y limpiar formulario cliente
    */
}

// Función: mostrar resumen de ventas
function mostrarVentas() {
  let cmpTabla = document.getElementById('tablaVentas');
  cmpTabla.innerHTML = '';
  let contenidoTabla = '<table><tr>' +
    '<th>CLIENTE</th>' +
    '<th>TOTAL</th>' +
    '</tr>';

  let elementoVenta;
  for (let i = 0; i < ventas.length; i++) {
    elementoVenta = ventas[i];
    contenidoTabla += '<tr><td>' + elementoVenta.cliente.nombre + '</td>'
      + '<td>' + elementoVenta.total + '</td>'
      + '</tr>';
  }
  contenidoTabla += '</table>';
  cmpTabla.innerHTML = contenidoTabla;

  let cmpTotalVentas = document.getElementById('totalVentas');
  let totalVentas = 0;
  for (let i = 0; i < ventas.length; i++) {
    elementoVenta = ventas[i];
    totalVentas += elementoVenta.total;
  }
  cmpTotalVentas.innerHTML = totalVentas.toFixed(2);

  let cmpProductoMasVendido = document.getElementById('productoMasVendido');
  cmpProductoMasVendido.innerHTML = calcularProductoMasVendido();
}

// Función: calcular producto más vendido
function calcularProductoMasVendido() {
  let productoMasVendido = carrito[0];
  let elementoProducto;
  for (let i = 1; i < carrito.length; i++) {
    elementoProducto = carrito[i];
    if (elementoProducto.cantidad > productoMasVendido.cantidad) {
      productoMasVendido = elementoProducto;
    }
  }
  return productoMasVendido.nombre;
}

