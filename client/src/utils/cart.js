export function getCart() {
  let cartString = localStorage.getItem("cart");

  if (cartString == null) {
    cartString = "[]";
    localStorage.setItem("cart", cartString);
  }

  return JSON.parse(cartString);
}

export function addToCart(product, qty) {
  const cart = getCart();

  const existingProductIndex = cart.findIndex(
    (item) => item.productId === product.productId
  );

  if (existingProductIndex !== -1) {
    
    const newQty = cart[existingProductIndex].quantity + qty;

    if (newQty <= 0) {
    
      const newCart = cart.filter((_, i) => i !== existingProductIndex);
      localStorage.setItem("cart", JSON.stringify(newCart));

    } else {
      cart[existingProductIndex].quantity = newQty;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  } else {
    
    cart.push({
      productId: product.productId,
      name: product.name,
      image: product.images ? product.images[0] : product.image, 
      price: product.price,
      quantity: qty,
      altNames: product.altNames,
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }

}

export function getTotal(){
    const cart = getCart();
    let total = 0;
    cart.forEach((item) => {
        total += item.price * item.quantity;
    });
    return total;
}