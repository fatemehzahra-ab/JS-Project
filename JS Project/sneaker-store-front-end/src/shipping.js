import "./style.css";

const shippingOptions = [
  {
    name: "Economy",
    price: 10,
    image: "svgs/shipping-economy.svg",
    arrival: "Estimated Arrival, Dec 20-23",
  },
  {
    name: "Regular",
    price: 15,
    image: "svgs/shipping-regular.svg",
    arrival: "Estimated Arrival, Dec 20-22",
  },
  {
    name: "Cargo",
    price: 20,
    image: "svgs/shipping-cargo.svg",
    arrival: "Estimated Arrival, Dec 19-20",
  },
  {
    name: "Express",
    price: 30,
    image: "svgs/shipping-express.svg",
    arrival: "Estimated Arrival, Dec 18-19",
  },
];

const container = document.querySelector(".space-y-4");
let selectedBox = null;

shippingOptions.forEach((option) => {
  const box = document.createElement("div");
  box.className =
    "bg-white p-4 rounded-2xl shadow flex items-center justify-between shipping-option";
  box.dataset.name = option.name;
  box.dataset.price = option.price;
  box.dataset.image = option.image;
  box.dataset.arrival = option.arrival;

  box.innerHTML = `
    <div class="flex items-center">
      <div class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mr-4">
        <img src="${option.image}" alt="${option.name}" />
      </div>
      <div>
        <p class="font-semibold">${option.name}</p>
        <p class="text-gray-600 text-sm">${option.arrival}</p>
      </div>
    </div>
    <div class="flex items-center">
      <p class="text-lg font-semibold mr-4">$${option.price}</p>
      <div class="bullet w-5 h-5 border-2 border-gray-400 rounded-full"></div>
    </div>
  `;

  box.addEventListener("click", () => {
    document.querySelectorAll(".bullet").forEach((b) => {
      b.classList.remove("bg-black");
    });

    const bullet = box.querySelector(".bullet");
    bullet.classList.add("bg-black");
    selectedBox = box;
  });

  container.appendChild(box);
});

document.getElementById("apply").addEventListener("click", () => {
  if (!selectedBox) {
    alert("Please select a shipping option");
    return;
  }

  const shippingData = {
    name: selectedBox.dataset.name,
    price: selectedBox.dataset.price,
    image: selectedBox.dataset.image,
    arrival: selectedBox.dataset.arrival,
  };

  localStorage.setItem("selectedShippingBox", JSON.stringify(shippingData));
  window.location.href = "checkout.html";
});
