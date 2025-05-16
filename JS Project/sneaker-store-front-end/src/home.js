import "./style.css";

const productGrid = document.getElementById("productGrid");

const token = "e1dbb60e-2638-4b4a-8327-a8095f81f5a9";

const fetchProducts = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/sneaker?page=1&limit=100",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const products = data.data;

    productGrid.innerHTML = products
      .map(
        (product) => `
      <div class="bg-white rounded-md flex flex-col justify-start text-sm">
        <img src="${product.imageURL}"  class="h-[182px] w-[182px] gap-5 mb-1  mx-auto rounded-[24px]" />
        <h2 class="text-[#152536] font-bold text-[20px] h-[24px] mb-2 truncate">${product.name}</h2>
        <p class="text-[16px] text-[#152536] font-semibold">$${product.price}</p>
      </div>
    `
      )
      .join("");
  } catch (err) {
    productGrid.innerHTML = `<p class="text-red-600">error: ${err.message}</p>`;
  }
};

fetchProducts();
