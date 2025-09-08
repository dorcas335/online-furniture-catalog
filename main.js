import { setupCatalog } from "./modules/catalogFiltering.js";
import { validateFrom } from "./modules/formValidation.js";

window.addEventListener("DOMContentLoaded", () => {
    setupCatalog(); // initialize the catalog and filtering operations
    validateFrom(); // initialize contact form validation
})