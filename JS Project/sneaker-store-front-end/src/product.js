import "./style.css";
import { fetchProductById } from "../apis/products";

const quantityElement = document.getElementById("quantity");
const totalPriceElement = document.getElementById("totalPrice");
const productNameElement = document.getElementById("productname");
const productImageElement = document.getElementById("productimage");
const sizeContainer = document.getElementById("size");
const colorContainer = document.querySelectorAll("div.mt-4 > div.space-x-2")[1];
const userCartList = document.getElementById("usercart");
const messageBox = document.getElementById("messageBox");

let selectedSize = null;
let selectedColor = null;
let quantity = 1;
let product = null;

const renderProduct = (data) => {
  product = data;
  if (productNameElement)
    productNameElement.textContent = product.name || "Product";
  if (productImageElement && product.imageURL) {
    productImageElement.src = product.imageURL;
    productImageElement.alt = product.name || "Product Image";
  }

  if (!Array.isArray(product.sizes)) {
    if (typeof product.sizes === "string") {
      product.sizes = product.sizes.split("|").map((s) => s.trim());
    } else if (product.sizes) {
      product.sizes = [product.sizes];
    } else {
      product.sizes = [];
    }
  }

  if (!Array.isArray(product.colors)) {
    if (typeof product.colors === "string") {
      product.colors = product.colors.split("|").map((c) => c.trim());
    } else if (product.colors) {
      product.colors = [product.colors];
    } else {
      product.colors = [];
    }
  }

  if (sizeContainer) {
    sizeContainer.innerHTML = product.sizes
      .map(
        (size) => `
          <button
            class="w-10 h-10 rounded-full border border-gray-300 hover:border-black focus:border-black focus:bg-gray-100"
            onclick="selectSize('${size}')"
          >
            ${size}
          </button>`
      )
      .join("");
  }

  if (colorContainer) {
    colorContainer.innerHTML = product.colors
      .map(
        (color) => `
          <button
            class="w-10 h-10 rounded-full border-2"
            style="background-color:${color};"
            onclick="selectColor('${color}')"
          ></button>`
      )
      .join("");
  }

  selectedSize = null;
  selectedColor = null;
  quantity = 1;
  quantityElement.textContent = quantity;

  updateTotalPrice();
};

const showMessage = (text, type = "error") => {
  messageBox.textContent = text;
  messageBox.className = `text-white p-2 rounded mt-4 ${
    type === "error" ? "bg-red-500" : "bg-green-500"
  }`;
  messageBox.classList.remove("hidden");

  setTimeout(() => {
    messageBox.classList.add("hidden");
  }, 3000);
};

const loadProduct = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  if (!productId) return;

  try {
    const productData = await fetchProductById(productId);
    renderProduct(productData);
    userCartList.addEventListener("click", () => {
      if (!selectedSize || !selectedColor) {
        showMessage("Please select size and color!", "error");
        return;
      }

      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const cartItem = {
        id: product.id,
        name: product.name,
        imageURL: product.imageURL,
        price: product.price,
        size: selectedSize,
        color: selectedColor,
        quantity,
      };
      const existingIndex = cart.findIndex(
        (item) =>
          item.id === cartItem.id &&
          item.size === cartItem.size &&
          item.color === cartItem.color
      );

      if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
      } else {
        cart.push(cartItem);
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      showMessage("Added to cart successfully!", "success");
    });
  } catch (err) {
    document.getElementById(
      "product-detail"
    ).innerHTML = `<p class="text-red-600">Error: ${err.message}</p>`;
  }
};
loadProduct();

const updateTotalPrice = () => {
  if (product) {
    const total = product.price * quantity;
    totalPriceElement.textContent = `$${total.toFixed(2)}`;
  }
};

window.updateQuantity = (num) => {
  quantity = Math.max(1, quantity + num);
  quantityElement.textContent = quantity;
  updateTotalPrice();
};

window.selectSize = (size) => {
  selectedSize = size;
  Array.from(sizeContainer.children).forEach((btn) => {
    btn.classList.toggle("border-black", btn.textContent == size);
    btn.classList.toggle("bg-gray-100", btn.textContent == size);
  });
};

window.selectColor = (color) => {
  selectedColor = color;
  Array.from(colorContainer.children).forEach((btn) => {
    btn.classList.toggle(
      "border-black",
      btn.style.backgroundColor.toLowerCase() === color.toLowerCase()
    );
    btn.classList.toggle(
      "border-gray-300",
      btn.style.backgroundColor.toLowerCase() !== color.toLowerCase()
    );
  });
};
