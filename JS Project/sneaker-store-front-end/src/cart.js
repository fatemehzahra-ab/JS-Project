import "./style.css";
const cartContainer = document.getElementById("cartbox");

const cart = JSON.parse(localStorage.getItem("cart")) || [];

if (cart.length === 0) {
  cartContainer.innerHTML += `<p class="text-center mt-10 text-gray-500">Your cart is empty.</p>`;
} else {
  cart.forEach((item) => {
    const itemHTML = `
      <div class="flex items-center m-4 p-4 rounded-2xl shadow-xl">
        <img src='${item.imageURL}' class="w-25 h-25 rounded-2xl mr-4" alt="${
      item.name
    }" />
        <div>
          <h2 class="font-semibold text-lg">${item.name}</h2>
          <p>Size: ${
            item.size
          } | Color: <span style="display:inline-block;width:16px;height:16px;background:${
      item.color
    };border-radius:50%;vertical-align:middle;"></span></p>
          <p>Qty: ${item.quantity}</p>
          <p class="text-green-600 font-bold">$${(
            item.price * item.quantity
          ).toFixed(2)}</p>
        </div>
      </div>
    `;
    cartContainer.innerHTML += itemHTML;
  });
}
