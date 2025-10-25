// === Part A: Array and Object Demonstrations ===
console.log("=== Activity 7: Product Catalog Display ===");

// Arrays
const numbers = [1, 2, 3, 4, 5];
const colors = ['red', 'green', 'blue'];
const mixed = [42, 'hello', true, null, { name: 'John' }];

console.log("Numbers array:", numbers);
console.log("Colors array:", colors);
console.log("Mixed array:", mixed);

// Array methods
let fruits = ['apple', 'banana'];
console.log("Original fruits:", fruits);
fruits.push('orange');
fruits.pop();
fruits.unshift('grape');
fruits.shift();
console.log("Modified fruits:", fruits);

// Iteration examples
numbers.forEach(num => console.log("ForEach number:", num));
const doubled = numbers.map(num => num * 2);
console.log("Doubled numbers (map):", doubled);
const even = numbers.filter(num => num % 2 === 0);
console.log("Even numbers (filter):", even);

// Objects
const person = { name: "Alice", age: 25 };
console.log("Person name (dot):", person.name);
person.country = "USA";
delete person.age;
console.log("Modified object:", person);

// === Part B: Product Data Structure ===
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Noise-cancelling Bluetooth headphones.",
    price: 120,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1465"
  },
  {
    id: 2,
    name: "Smartwatch",
    description: "Fitness tracker and smartwatch combo.",
    price: 90,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=627"
  },
  {
    id: 3,
    name: "T-Shirt",
    description: "Comfortable cotton t-shirt.",
    price: 25,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHNoaXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500"
  },
  {
    id: 4,
    name: "Novel Book",
    description: "A thrilling mystery novel.",
    price: 15,
    category: "books",
    image: "https://images.unsplash.com/photo-1590616067388-b8906beddcc2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bm92ZWwlMjBib29rfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500"
  },
  {
    id: 5,
    name: "Jeans",
    description: "Stylish denim jeans.",
    price: 50,
    category: "clothing",
    image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGplYW5zfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500"
  }
];

const avgPrice = products.reduce((acc, p) => acc + p.price, 0) / products.length;
console.log("Average price:", avgPrice.toFixed(2));

// === Part C: Product Display Functions ===
const productGrid = document.getElementById("product-grid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const clearFilters = document.getElementById("clearFilters");

function createProductCard(product) {
  return `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">$${product.price}</p>
        <small>${product.category}</small>
      </div>
    </div>
  `;
}

function displayProducts(filteredProducts) {
  productGrid.innerHTML = "";
  filteredProducts.forEach(product => {
    productGrid.innerHTML += createProductCard(product);
  });
}

displayProducts(products);

// === Part D: Search and Filter Features ===
function filterProducts() {
  const searchText = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  const filtered = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchText) ||
      p.description.toLowerCase().includes(searchText);
    const matchesCategory = category === "all" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  displayProducts(filtered);
}

searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
clearFilters.addEventListener("click", () => {
  searchInput.value = "";
  categoryFilter.value = "all";
  displayProducts(products);
});
