import "./style.css";
import { fetchProducts } from "../apis/products";
import { logout } from "../apis/auth";

const productGrid = document.getElementById("productGrid");
const usernamePlaceholder = document.getElementById("username-placeholder");
const greetingText = document.querySelector(".greeting");
const searchInput = document.getElementById("searchbox");
const logOutButton = document.getElementById("logout");

let products = [];

const hour = new Date().getHours();
let greeting = "Good Morning";
if (hour >= 12 && hour < 18) greeting = "Good Afternoon";
else if (hour >= 18) greeting = "Good Evening";

greetingText.innerText = `${greeting} 👋`;

const username = localStorage.getItem("username") || "User";
usernamePlaceholder.innerText = username;

logOutButton.addEventListener("click", logout);

const loadProducts = async () => {
  try {
    const resBody = await fetchProducts({ page: 1, limit: 100 });
    products = resBody.data;

    productGrid.innerHTML = products
      .map(
        (product) => `
        <div class="product-item bg-white rounded-md flex flex-col justify-start text-sm cursor-pointer" data-id="${product.id}">
        <img src="${product.imageURL}"  class="h-[182px] w-[182px] gap-5 mb-1  mx-auto rounded-[24px]" />
        <h2 class="text-[#152536] font-bold text-[20px] h-[24px] mb-2 truncate">${product.name}</h2>
        <p class="text-[16px] text-[#152536] font-semibold">$${product.price}</p>
      </div>
    `
      )
      .join("");
    const productItems = document.querySelectorAll(".product-item");

    productItems.forEach((item) => {
      item.addEventListener("click", () => {
        const productId = item.getAttribute("data-id");
        window.location.href = `/product.html?id=${productId}`;
      });
    });

    const head = document.querySelector(".showhead");
    const originalHeadHTML = head.innerHTML;

    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();

      if (!value) {
        productItems.forEach((item) => {
          item.classList.remove("hidden");
          item.classList.add("block");
        });
        head.classList.remove("hidden");
        head.innerHTML = originalHeadHTML;
        return;
      }
      let matchCount = 0;

      products.forEach((product, index) => {
        const isVisible = product.name.toLowerCase().includes(value);
        const item = document.querySelectorAll(".product-item")[index];

        item.classList.toggle("hidden", !isVisible);
        item.classList.toggle("block", isVisible);

        if (isVisible) matchCount++;
      });

      if (value && matchCount > 0) {
        head.classList.remove("hidden");
        head.innerHTML = `
          <div class="flex justify-between">
            <p class="text-[#152536] font-semibold text-[20px] ml-[24px] mt-[30px] ">
              Results for "${value}"
            </p>
            <p class="text-[#152536] font-semibold text-[16px] mt-[33px] mr-[20px]">
            ${matchCount} found${matchCount > 1 ? "s" : ""}
            </p>
          </div>
        `;
      } else {
        head.classList.remove("hidden");
        head.innerHTML = `
          <img src="img/Not Found copy.png" class="w-[300px] mx-auto my-[150px]"/>
        `;
      }
    });
  } catch (err) {
    productGrid.innerHTML = `<p class="text-red-600">error: ${err.message}</p>`;
  }
};

loadProducts();

// import "./style.css";

// const productGrid = document.getElementById("productGrid");

// const token = "86e129aa-33a3-4235-a2ba-82caa983705d";

// const fetchProducts = async () => {
//   try {
//     const response = await fetch(
//       "http://localhost:3000/sneaker?page=1&limit=100",
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     const products = data.data;

//     productGrid.innerHTML = products
//       .map(
//         (product) => `
//       <div class="bg-white rounded-md flex flex-col justify-start text-sm">
//         <img src="${product.imageURL}"  class="h-[182px] w-[182px] gap-5 mb-1  mx-auto rounded-[24px]" />
//         <h2 class="text-[#152536] font-bold text-[20px] h-[24px] mb-2 truncate">${product.name}</h2>
//         <p class="text-[16px] text-[#152536] font-semibold">$${product.price}</p>
//       </div>
//     `
//       )
//       .join("");
//   } catch (err) {
//     productGrid.innerHTML = `<p class="text-red-600">error: ${err.message}</p>`;
//   }
// };

// fetchProducts();
