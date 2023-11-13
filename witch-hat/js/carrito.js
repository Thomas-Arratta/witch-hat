const mostrarCarrito = () =>{
    cardCarritoContainer.innerText = ""
    cardCarritoContainer.style.display = "flex";
    const cardShopHeader = document.createElement("div");
    cardShopHeader.className = "card-shop-header"
    cardShopHeader.innerHTML = `
    <h1 class = "card-shop-header-title">Carrito.</h1>
    `;
    cardCarritoContainer.append(cardShopHeader);

    const cardCarritoButton = document.createElement("h1");
    cardCarritoButton.innerText = "x";
    cardCarritoButton.className = "card-shop-header-button";

    cardCarritoButton.addEventListener("click", () => {
        cardCarritoContainer.style.display = "none";
    });

    cardShopHeader.append(cardCarritoButton);

    carrito.forEach((product) =>{
        let carritoContent = document.createElement("div");
        carritoContent.className = "card-carrito-content";
        carritoContent.innerHTML = `
        <img src = "${product.img}"
        <h3>${product.nombre}</h3>
        <p>${product.precio} $</p>
        <span class="delete-product"> ❌ </span>
        `;

        cardCarritoContainer.append(carritoContent); 

        let eliminar = carritoContent.querySelector(".delete-product");

        eliminar.addEventListener("click", () => {
        eliminarProducto(product.id);
        });
    });

    const total = carrito.reduce((acc, el) => acc + el.precio, 0);

    const totalCompra = document.createElement("div");
    totalCompra.className = "total-content";
    totalCompra.innerHTML = `total a pagar: ${total} $`;
    cardCarritoContainer.append(totalCompra);
};

verCarrito.addEventListener("click" , mostrarCarrito);

const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });

    contadorCarrito();
    saveLocal(); 
    mostrarCarrito();
};

const contadorCarrito = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem(carritoLength));
};

contadorCarrito();
