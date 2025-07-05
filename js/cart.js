document.addEventListener("DOMContentLoaded", async () => {
    
    const product_render = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        update_cart_count(cart);

        let cart_container = document.getElementById("cart-container");
        cart_container.innerHTML = "";

        let cart_price = document.getElementById("cart-price");
        cart_price.innerHTML = "";

        if (!cart.length) {
            let cart_message = document.createElement("p");
            cart_message.textContent = "El carrito está vacío. Agrega productos para comprar.";
            
            let go_to_store_button = store_button("Ir a la tienda");

            cart_message.appendChild(document.createElement("br"));
            cart_message.appendChild(go_to_store_button);
            cart_container.appendChild(cart_message);
            
        } else {
            let total_price = 0;
            cart.forEach((product, i) => {
                let product_card = document.createElement("div");
				product_card.classList.add("product");

				let product_img = document.createElement("img");
				product_img.src = product.images[0];
				product_img.alt = product.description;

				let product_name = document.createElement("p");
				product_name.textContent = product.title;

				let product_price = document.createElement("p");
                let product_price_value = product.price;
				product_price.textContent = `$${product_price_value}`;
                total_price += product_price_value;

                let remove_from_cart_button = document.createElement("button");
                remove_from_cart_button.textContent = "Eliminar del carrito";
                remove_from_cart_button.addEventListener("click", () => {
                    remove_cart_product(i);
                });

                product_card.appendChild(product_img);
                product_card.appendChild(product_name);
                product_card.appendChild(product_price);
                product_card.appendChild(remove_from_cart_button);
                cart_container.appendChild(product_card);
            });

            let total_price_element = document.createElement("p");
            total_price_element.classList.add("cart-price");
            total_price = Math.round(total_price * 100) / 100;
            total_price_element.textContent = `Precio total: $${total_price}`;

            cart_price.appendChild(total_price_element);
        }
        cart_actions_render();
    }

    const update_cart_count = (cart) => {
		let cart_count = document.getElementById("cart-count");
		cart_count.textContent = cart.length;
	}

    const remove_cart_product = (index) => {
        let new_cart = JSON.parse(localStorage.getItem("cart")) || [];
        new_cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(new_cart));
        alert(`Producto eliminado del carrito`);
        product_render();
    }

    const empty_cart = () => {
        localStorage.removeItem("cart");
        alert("Carrito vaciado");
        product_render();
    }

    const finish_purchase = () => {
        let confirmed = confirm("¿Estás seguro de que deseas finalizar la compra?");
        if (confirmed) {
            alert("Compra finalizada. ¡Gracias por tu compra!");
            localStorage.removeItem("cart");
            window.location.href = "../index.html";
        }
    }

    const cart_actions_render = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        let cart_accions = document.getElementById("cart-actions");
        cart_accions.innerHTML = "";

        if (cart.length) {
            let empty_cart_button = document.createElement("button");
            empty_cart_button.textContent = " Vaciar carrito";
            empty_cart_button.style.fontSize = "1.2rem";
            let icon = document.createElement("i");
            icon.classList.add("fa-solid", "fa-trash-can");
            empty_cart_button.prepend(icon);
            empty_cart_button.addEventListener("click", () => {
                empty_cart();
            });

            let go_to_store_button = store_button("Seguir comprando");

            let checkout_button = document.createElement("button");
            checkout_button.textContent = " Finalizar compra";
            checkout_button.style.fontSize = "1.2rem";
            let credit_card_icon = document.createElement("i");
            credit_card_icon.classList.add("fa-regular", "fa-credit-card");
            checkout_button.prepend(credit_card_icon);
            checkout_button.addEventListener("click", () => {
                finish_purchase();
            });
            cart_accions.appendChild(empty_cart_button);
            cart_accions.appendChild(go_to_store_button);
            cart_accions.appendChild(checkout_button);
        }
    }

    product_render();
});

function store_button(text) {
    let go_to_store_button = document.createElement("button");
    go_to_store_button.style.marginTop = "10px";
    go_to_store_button.style.fontSize = "1.2rem";
    go_to_store_button.textContent = ` ${text}`;

    let store_icon = document.createElement("i");
    store_icon.classList.add("fa-solid", "fa-shop");
    go_to_store_button.prepend(store_icon);
    go_to_store_button.addEventListener("click", () => {
        window.location.href = "../index.html#products";
    });
    return go_to_store_button;
}
