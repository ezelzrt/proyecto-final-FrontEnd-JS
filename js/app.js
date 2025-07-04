document.addEventListener("DOMContentLoaded", () => {
	let cart = JSON.parse(localStorage.getItem("cart")) || [];

	const productRender = async () => {
		try {
			let response = await fetch('https://dummyjson.com/products/category-list');
			let categories = await response.json();
	
			let random_category = categories[Math.floor(Math.random() * categories.length)];
			let url = `https://dummyjson.com/products/category/${random_category}?limit=8`;

			let productResponse = await fetch(url);
			let data = await productResponse.json();
			
			let products_container = document.getElementById("products-container");
			for (const product of data.products) {
				let product_card = document.createElement("div");
				product_card.classList.add("product");

				let product_img = document.createElement("img");
				product_img.src = product.images[0];
				product_img.alt = product.description;

				let product_name = document.createElement("p");
				product_name.classList.add("product-name");
				product_name.textContent = product.title;

				let product_price = document.createElement("p");
				// product_price.classList.add("product-price");
				product_price.textContent = `$${product.price}`;

				let add_to_cart_button = document.createElement("button");
				// add_to_cart_button.classList.add("add-to-cart");
				add_to_cart_button.textContent = "Agregar al carrito";

				add_to_cart_button.addEventListener("click", () => {
					alert(`${product.title} agregado al carrito`)
					add_to_cart(product);
					update_cart_count();
				})

				product_card.appendChild(product_img);
				product_card.appendChild(product_name);
				product_card.appendChild(product_price);
				product_card.appendChild(add_to_cart_button);
				products_container.appendChild(product_card);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const add_to_cart = (product) => {
		cart.push(product)
		localStorage.setItem("cart", JSON.stringify(cart));
	}

	const update_cart_count = () => {
		let cart_count = document.getElementById("cart-count");
		cart_count.textContent = cart.length;
	}

	productRender();
	update_cart_count();
});
