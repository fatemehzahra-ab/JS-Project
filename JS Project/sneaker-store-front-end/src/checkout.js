import "./style.css";

const cartContainer = document.getElementById("cartbox");
const totalPriceEl = document.querySelector(".totalprice");

const cart = JSON.parse(localStorage.getItem("cart")) || [];

if (cart.length === 0) {
  cartContainer.innerHTML = `<p class="text-center text-gray-500">Your cart is empty.</p>`;
} else {
  let total = 0;
  cartContainer.innerHTML = "";
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartContainer.innerHTML += `
      <div class="flex items-center p-4 bg-white shadow rounded-xl mb-2">
        <img src="${item.imageURL}" alt="${
      item.name
    }" class="w-16 h-16 rounded-lg mr-4" />
        <div>
          <h3 class="font-semibold">${item.name}</h3>
          <p class="text-sm">Size: ${item.size} | Qty: ${item.quantity}</p>
          <p class="text-green-600 font-bold">$${itemTotal.toFixed(2)}</p>
        </div>
      </div>
    `;
  });

  totalPriceEl.textContent = `$${total.toFixed(2)}`;
}

const savedShipping = localStorage.getItem("selectedShippingBox");
const summaryContainer = document.getElementById("shipping-summary");

summaryContainer.innerHTML = "";

if (!savedShipping) {
  summaryContainer.innerHTML = `<p class="text-center text-gray-500">No shipping option selected.</p>`;
} else {
  const data = JSON.parse(savedShipping);
  const box = document.createElement("div");

  box.innerHTML = `
    <div class="flex items-center">
      <div class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mr-4">
        <img src="${data.image}" alt="${data.name}" />
      </div>
      <div class="mr-[32px]">
        <p class="font-semibold">${data.name}</p>
        <p class="text-gray-600 text-sm">${data.arrival}</p>
      </div>
      <p class="text-lg font-semibold">$${Number(data.price).toFixed(2)}</p>
    </div>
  `;

  summaryContainer.appendChild(box);
}

if (savedShipping) {
  document.getElementById("shipping-type").classList.add("hidden");
  document.getElementById("shipping-icon").classList.add("hidden");

  const shippingDetails = document.getElementById("shipping-details");
  const shippingData = JSON.parse(savedShipping);
  shippingDetails.textContent = `${shippingData.name} • ${
    shippingData.arrival
  } • $${Number(shippingData.price).toFixed(2)}`;
  shippingDetails.classList.remove("hidden");
} else {
  document.getElementById("shipping-type").classList.remove("hidden");
  document.getElementById("shipping-icon").classList.remove("hidden");
  document.getElementById("shipping-details").classList.add("hidden");
}
