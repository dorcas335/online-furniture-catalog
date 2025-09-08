import { allProducts } from "./furnitureData.js";


// To make the appearance of products on the screen randomized.
// Making use of Fisher–Yate's shuffle algorithm.
export const shuffleArray = (arr) => {
    const newArr = [...arr]; 
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

// show all products initally
export const displayProducts = (arr) => {
    const productContainer = document.querySelector(".product-grid");
    const shuffledArr = shuffleArray(arr); 
    productContainer.innerHTML = shuffledArr.map(product => product.displayCard()).join("");
} 


// filter by category
export const filterByCategory = (category) => {
    if (category === "all") {
        displayProducts(allProducts);
    } else {
        const filteredResult = allProducts.filter(p => p.category === category);
        displayProducts(filteredResult);
    }
    console.log(category)
    sessionStorage.setItem("selectedCategory", category);
}



//event listener to cleanly update DOM by filtered value.
export const setupCatalog = () => {
    const filters = document.querySelector(".product-filters")
    filters.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            filters.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));
    
            e.target.classList.add('active');
    
            const selectedCategory = e.target.dataset.category;
            filterByCategory(selectedCategory);
        }
    })


    // Restore the user's last selected filter when the page loads
    const lastSelectedCategory = sessionStorage.getItem("selectedCategory") || "all";
    
    const activeButton = document.querySelector(`.product-filters button[data-category="${lastSelectedCategory}"]`);
    if (activeButton) {
        filters.querySelectorAll("button").forEach(btn => btn.classList.remove("active"));
        activeButton.classList.add("active");
    }
    
    filterByCategory(lastSelectedCategory);

    // Mobile menu toggle
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("header nav");
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
}

