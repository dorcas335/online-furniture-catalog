// main.js (module)
const PRODUCTS = [
  // keep these consistent with your previous furnitureData.js entries
  { id: 1, name: "Mixt Wooden Table", price: 150000, img: "images/ani-coffee-tables-39870684627166-Photoroom.webp", category: "table", desc: "Solid teak wood table — elegant and durable." },
  { id: 2, name: "Nordic Chair", price: 150000, img: "images/Image-2.png", category: "chair", desc: "Scandinavian design with comfortable padding." },
  { id: 3, name: "Office Chair", price: 185000, img: "images/istockphoto-1490325659-612x612.jpg", category: "chair", desc: "Ergonomic office chair to support long hours." },
  { id: 4, name: "Nordic Chair 2", price: 100000, img: "images/istockphoto-1353198901-612x612.jpg", category: "chair", desc: "Minimalist wooden chair with soft cushion." },
  { id: 5, name: "County Sofa", price: 450000, img: "images/istockphoto-670435526-612x612.jpg", category: "sofa", desc: "Large comfortable sofa for family rooms." },
  { id: 6, name: "Brexts wooden chair", price: 150000, img: "images/istockphoto-2210323669-612x612.jpg", category: "chair", desc: "Classic wooden dining chair." },
  { id: 7, name: "Nordic table", price: 185000, img: "images/raji-table-coffee-tables-39872517570782-Photoroom.webp", category: "table", desc: "Coffee table with clean lines." },
  { id: 8, name: "Vantix chair", price: 100000, img: "images/Image-3.png", category: "chair", desc: "Lightweight lounge chair." },
  { id: 9, name: "Vax and Tai Sofa", price: 100000, img: "images/istockphoto-671631434-612x612.jpg", category: "sofa", desc: "Compact sofa for cozy corners." },
  { id: 10, name: "Nordic table 2", price: 120000, img: "images/obi-39950930903262-Photoroom-2.webp", category: "table", desc: "Stylish dining table." },
  { id: 11, name: "Arventis Sofa", price: 150000, img: "images/11288297.png", category: "sofa", desc: "Elegant two-seater." },
  { id: 12, name: "Visache Sofa", price: 250000, img: "images/istockphoto-869080516-612x612.jpg", category: "sofa", desc: "Premium fabric sofa." }
];

// Utilities
const qs = (s) => document.querySelector(s);
const qsa = (s) => Array.from(document.querySelectorAll(s));

/* ---------- State: cart & filters ---------- */
let CART = JSON.parse(localStorage.getItem("furni_cart") || "[]");
let selectedCategory = sessionStorage.getItem("selectedCategory") || "all";

/* ---------- DOM Nodes ---------- */
const productGrid = qs(".product-grid");
const filtersEl = qs(".product-filters");
const cartBtn = qs("#cartBtn");
const cartSidebar = qs("#cartSidebar");
const cartItemsEl = qs("#cartItems");
const cartCountEl = qs("#cartCount");
const cartSubtotalEl = qs("#cartSubtotal");
const closeCartBtn = qs("#closeCart");
const clearCartBtn = qs("#clearCartBtn");
const checkoutBtn = qs("#checkoutBtn");

const productModal = qs("#productModal");
const modalClose = productModal.querySelector(".modal-close");
const modalImage = qs("#modalImage");
const modalTitle = qs("#modalTitle");
const modalPrice = qs("#modalPrice");
const modalDesc = qs("#modalDesc");
const modalQty = qs("#modalQty");
const addToCartBtn = qs("#addToCartBtn");

const checkoutModal = qs("#checkoutModal");
const checkoutForm = qs("#checkoutForm");
const checkoutTotalEl = qs("#checkoutTotal");
const backToCartBtn = qs("#backToCart");

const orderSuccess = qs("#orderSuccess");
const closeSuccess = qs("#closeSuccess");

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  setupFilters();
  renderProducts(PRODUCTS);
  restoreFilterUI();
  renderCart();
  setupHeader();
  setupFormValidation();
});

/* ---------- Product display & interactions ---------- */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderProducts(items) {
  const shuffled = shuffle(items);
  productGrid.innerHTML = shuffled.map(p => productCardHTML(p)).join("");
  // attach click for each product to open modal
  qsa(".product-item").forEach(el => {
    el.addEventListener("click", () => {
      const id = Number(el.dataset.id);
      openProductModal(id);
    });
  });
}

function productCardHTML(p) {
  return `
    <article class="product-item" data-id="${p.id}" tabindex="0" aria-label="${p.name}">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">₦${p.price.toLocaleString()}</p>
    </article>
  `;
}

/* ---------- Filters ---------- */
function setupFilters() {
  filtersEl.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;
    filtersEl.querySelectorAll("button").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    selectedCategory = e.target.dataset.category;
    sessionStorage.setItem("selectedCategory", selectedCategory);
    applyFilter();
  });
  applyFilter();
}

function applyFilter() {
  let filtered = PRODUCTS;
  if (selectedCategory && selectedCategory !== "all") {
    filtered = PRODUCTS.filter(p => p.category === selectedCategory);
  }
  renderProducts(filtered);
}

function restoreFilterUI() {
  const btn = qs(`.product-filters button[data-category="${selectedCategory}"]`);
  if (btn) {
    filtersEl.querySelectorAll("button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  }
}

/* ---------- Product Modal ---------- */
let activeProduct = null;
function openProductModal(id) {
  activeProduct = PRODUCTS.find(p => p.id === id);
  if (!activeProduct) return;
  modalImage.src = activeProduct.img;
  modalImage.alt = activeProduct.name;
  modalTitle.textContent = activeProduct.name;
  modalDesc.textContent = activeProduct.desc || "Beautiful modern furniture piece.";
  modalPrice.textContent = `₦${activeProduct.price.toLocaleString()}`;
  modalQty.value = 1;
  productModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
modalClose.addEventListener("click", closeProductModal);
productModal.addEventListener("click", (e) => { if (e.target === productModal) closeProductModal(); });
function closeProductModal() {
  productModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/* ---------- Cart Management ---------- */
function saveCart() { localStorage.setItem("furni_cart", JSON.stringify(CART)); }

function addToCart(productId, qty = 1) {
  const exist = CART.find(i => i.id === productId);
  if (exist) { exist.qty += Number(qty); }
  else {
    const p = PRODUCTS.find(x => x.id === productId);
    CART.push({ id: p.id, name: p.name, price: p.price, img: p.img, qty: Number(qty) });
  }
  saveCart();
  renderCart();
}

addToCartBtn.addEventListener("click", () => {
  if (!activeProduct) return;
  const q = Number(modalQty.value) || 1;
  addToCart(activeProduct.id, q);
  closeProductModal();
  openCart();
});

/* Render Cart */
function renderCart() {
  // cart count
  const totalItems = CART.reduce((s, it) => s + it.qty, 0);
  cartCountEl.textContent = totalItems;
  // items
  if (CART.length === 0) {
    cartItemsEl.innerHTML = `<p style="color:#666; padding:24px;">Your cart is empty.</p>`;
  } else {
    cartItemsEl.innerHTML = CART.map(item => cartItemHTML(item)).join("");
    // attach qty handlers
    qsa(".cart-inc").forEach(btn => btn.addEventListener("click", () => changeQty(Number(btn.dataset.id), 1)));
    qsa(".cart-dec").forEach(btn => btn.addEventListener("click", () => changeQty(Number(btn.dataset.id), -1)));
    qsa(".cart-remove").forEach(btn => btn.addEventListener("click", () => removeItem(Number(btn.dataset.id))));
  }
  const subtotal = CART.reduce((s, it) => s + (it.price * it.qty), 0);
  cartSubtotalEl.textContent = `₦${subtotal.toLocaleString()}`;
  checkoutTotalEl.textContent = `₦${subtotal.toLocaleString()}`;
  saveCart();
}

function cartItemHTML(item) {
  return `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.img}" alt="${item.name}">
      <div style="min-width:0;">
        <div style="display:flex; gap:8px; align-items:center;">
          <strong style="font-size:0.98rem">${item.name}</strong>
          <span style="color:#666; margin-left:auto;">₦${(item.price * item.qty).toLocaleString()}</span>
        </div>
        <div style="color:#666; font-size:0.92rem;">₦${item.price.toLocaleString()} each</div>
      </div>

      <div class="qty-controls" style="margin-left:12px">
        <button class="cart-dec" data-id="${item.id}" aria-label="Decrease">−</button>
        <div style="padding:6px 8px; border-radius:6px; background:#fff; border:1px solid #eee;">${item.qty}</div>
        <button class="cart-inc" data-id="${item.id}" aria-label="Increase">+</button>
        <button class="cart-remove" data-id="${item.id}" title="Remove" style="margin-left:6px; background:transparent;border:none;cursor:pointer;color:#c62828;">✕</button>
      </div>
    </div>
  `;
}

function changeQty(id, delta) {
  const item = CART.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(0, item.qty + delta);
  if (item.qty === 0) removeItem(id);
  else renderCart();
}

function removeItem(id) {
  CART = CART.filter(i => i.id !== id);
  renderCart();
}

function clearCart() {
  CART = [];
  saveCart();
  renderCart();
}

/* ---------- Cart UI ---------- */
cartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
clearCartBtn.addEventListener("click", () => {
  if (!confirm("Clear all items from cart?")) return;
  clearCart();
});
checkoutBtn.addEventListener("click", () => {
  if (CART.length === 0) {
    alert("Your cart is empty.");
    return;
  }
  openCheckout();
});

function openCart() {
  cartSidebar.classList.add("open");
  cartSidebar.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartSidebar.classList.remove("open");
  cartSidebar.setAttribute("aria-hidden", "true");
}

/* ---------- Checkout ---------- */
function openCheckout() {
  checkoutModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCheckout() {
  checkoutModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

qsAll(".modal-close")?.forEach(btn => btn.addEventListener("click", (e) => {
  const modal = e.target.closest(".modal");
  if (modal) modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}));

backToCartBtn.addEventListener("click", () => {
  closeCheckout();
  openCart();
});

/* Checkout form validation & submit */
checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // simple validation
  const form = checkoutForm;
  const name = form.name.value.trim();
  const address = form.address.value.trim();
  const phone = form.phone.value.trim();
  const card = form.card.value.replace(/\s+/g, "");
  const expiry = form.expiry.value.trim();
  const cvv = form.cvv.value.trim();

  qsa("#checkoutForm .error").forEach(el => el.textContent = "");

  let ok = true;
  if (name.length < 3) { qs("#checkoutName").textContent = "Enter full name"; ok = false; }
  if (address.length < 8) { qs("#checkoutAddress").textContent = "Enter delivery address"; ok = false; }
  if (!/^\+?\d{7,15}$/.test(phone)) { qs("#checkoutPhone").textContent = "Enter a valid phone"; ok = false; }
  if (!/^\d{12,19}$/.test(card) || !luhnCheck(card)) { qs("#checkoutCard").textContent = "Invalid card number"; ok = false; }
  if (!/^\d{2}\/?\d{2}$/.test(expiry)) { alert("Expiry must be MM/YY"); ok = false; }
  if (!/^\d{3,4}$/.test(cvv)) { alert("Enter CVV (3 or 4 digits)"); ok = false; }

  if (!ok) return;

  // Simulate order placement
  // In real app you'd call backend; here we just show success and clear cart
  closeCheckout();
  closeCart();
  CART = [];
  saveCart();
  renderCart();
  showSuccess();
});

/* Luhn algorithm check for card numbers */
function luhnCheck(num) {
  // strip non-digits
  if (!/^\d+$/.test(num)) return false;
  let sum = 0, shouldDouble = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

/* Success toast */
function showSuccess() {
  orderSuccess.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "";
}
closeSuccess.addEventListener("click", () => orderSuccess.setAttribute("aria-hidden", "true"));

/* ---------- Contact Form Validation (based on user's previous code) ---------- */
function setupFormValidation() {
  const contactForm = qs("#contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;
    qsa(".error").forEach(err => err.textContent = "");

    const firstName = contactForm.firstName.value.trim();
    const lastName = contactForm.lastName.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (firstName.length === 0) {
      qs("#firstNameError").textContent = "First name is required.";
      isValid = false;
    }

    if (lastName.length === 0) {
      qs("#lastNameError").textContent = "Last name is required.";
      isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      qs("#emailError").textContent = "Enter a valid email address.";
      isValid = false;
    }

    if (message.length < 10) {
      qs("#messageError").textContent = "Message must be at least 10 characters.";
      isValid = false;
    }

    if (isValid) {
      alert("Form submitted successfully!");
      contactForm.reset();
    }
  });
}

/* ---------- Header interactions (mobile menu) ---------- */
function setupHeader() {
  const hamburger = qs(".hamburger");
  const nav = qs("header nav");
  hamburger.addEventListener("click", () => nav.classList.toggle("active"));
  // ensure cart close on outside click
  document.addEventListener("click", (e) => {
    if (!cartSidebar.contains(e.target) && !cartBtn.contains(e.target)) closeCart();
  });
}

/* ---------- small helper for selecting multiple ---------- */
function qsAll(sel) { return Array.from(document.querySelectorAll(sel)); }

/* ---------- Attach modal-close handlers to any present close buttons ---------- */
qsAll(".modal-close").forEach(btn => btn.addEventListener("click", () => {
  const modal = btn.closest(".modal");
  if (modal) modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}));

/* ---------- Small utility to open checkout when cart has items and checkout button pressed ---------- */
/* Done above. */

/* ---------- Expose nothing globally (module scope) ---------- */
