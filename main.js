// ==============================
// FORM VALIDATION
// ==============================
const validateForm = () => {
  const contactForm = document.getElementById("contact-form");

  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // Clear previous errors
    document.querySelectorAll(".error").forEach(err => {
      err.textContent = "";
      err.style.opacity = "0";
    });

    const firstName = contactForm.firstName.value.trim();
    const lastName = contactForm.lastName.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (firstName.length === 0) {
      showError("firstNameError", "First name is required.");
      isValid = false;
    }

    if (lastName.length === 0) {
      showError("lastNameError", "Last name is required.");
      isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError("emailError", "Enter a valid email address.");
      isValid = false;
    }

    if (message.length < 10) {
      showError("messageError", "Message must be at least 10 characters.");
      isValid = false;
    }

    if (isValid) {
      alert("Form submitted successfully!");
      contactForm.reset();
    }
  });
};

// Helper function to show animated errors
const showError = (id, message) => {
  const errorElem = document.getElementById(id);
  if (errorElem) {
    errorElem.textContent = message;
    errorElem.style.opacity = "1";
    errorElem.classList.add("shake");
    setTimeout(() => errorElem.classList.remove("shake"), 500);
  }
};

// ==============================
// PRODUCT CARD CLASS
// ==============================
class Card {
  constructor(name, price, link, category) {
    this.name = name;
    this.price = Number(price);
    this.link = link;
    this.category = category;
  }

  displayCard() {
    return `
      <div class="product-item animate-card">
        <img src="${this.link}" alt="${this.name}">
        <h3>${this.name}</h3>
        <p class="price">₦${this.price.toLocaleString()}</p>
      </div>
    `;
  }
}

// ==============================
// PRODUCT DATA
// ==============================
const allProducts = [
  new Card("Mixt Wooden Table", "150000.00", "images/ani-coffee-tables-39870684627166-Photoroom.webp", "table"),
  new Card("Nordic Chair", "150000.00", "images/Image-2.png", "chair"),
  new Card("Office Chair", "185000.00", "images/istockphoto-1490325659-612x612.jpg", "chair"),
  new Card("Nordic Chair", "100000.00", "images/istockphoto-1353198901-612x612.jpg", "chair"),
  new Card("County Sofa", "450000.00", "images/istockphoto-670435526-612x612.jpg", "sofa"),
  new Card("Brexts wooden chair", "150000.00", "images/istockphoto-2210323669-612x612.jpg", "chair"),
  new Card("Nordic table", "185000.00", "images/raji-table-coffee-tables-39872517570782-Photoroom.webp", "table"),
  new Card("Vantix chair", "100000.00", "images/Image-3.png", "chair"),
  new Card("Vax and Tai Sofa", "100000.00", "images/istockphoto-671631434-612x612.jpg", "sofa"),
  new Card("Nordic table", "120000.00", "images/obi-39950930903262-Photoroom-2.webp", "table"),
  new Card("Arventis Sofa", "150000.00", "images/11288297.png", "sofa"),
  new Card("Visache Sofa", "250000.00", "images/istockphoto-869080516-612x612.jpg", "sofa"),
];

// ==============================
// SHUFFLE FUNCTION (RANDOMIZE PRODUCTS)
// ==============================
const shuffleArray = (arr) => {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// ==============================
// DISPLAY PRODUCTS
// ==============================
const displayProducts = (arr) => {
  const productContainer = document.querySelector(".product-grid");
  if (!productContainer) return;

  const shuffledArr = shuffleArray(arr);
  productContainer.innerHTML = shuffledArr.map(product => product.displayCard()).join("");

  // Animate product cards on display
  document.querySelectorAll(".animate-card").forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    setTimeout(() => {
      card.style.transition = "all 0.5s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 100 * index);
  });
};

// ==============================
// FILTER BY CATEGORY
// ==============================
const filterByCategory = (category) => {
  if (category === "all") {
    displayProducts(allProducts);
  } else {
    const filteredResult = allProducts.filter(p => p.category === category);
    displayProducts(filteredResult);
  }

  sessionStorage.setItem("selectedCategory", category);
};

// ==============================
// CATALOG & FILTER SETUP
// ==============================
const setupCatalog = () => {
  const filters = document.querySelector(".product-filters");
  if (!filters) return;

  filters.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      filters.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));
      e.target.classList.add("active");

      const selectedCategory = e.target.dataset.category;
      filterByCategory(selectedCategory);
    }
  });

  // Restore last selected filter on reload
  const lastSelectedCategory = sessionStorage.getItem("selectedCategory") || "all";
  const activeButton = document.querySelector(`.product-filters button[data-category="${lastSelectedCategory}"]`);
  if (activeButton) {
    filters.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));
    activeButton.classList.add("active");
  }
  filterByCategory(lastSelectedCategory);

  // Mobile menu toggle with animation
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("header nav");
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }
};

// ==============================
// INITIALIZE EVERYTHING
// ==============================
window.addEventListener("DOMContentLoaded", () => {
  setupCatalog();
  validateForm();
});
