document.addEventListener("DOMContentLoaded", () => {
    const update_cart_count = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let cart_count = document.getElementById("cart-count");
        cart_count.textContent = cart.length ? cart.length : '';
	}
    
    update_cart_count();
});