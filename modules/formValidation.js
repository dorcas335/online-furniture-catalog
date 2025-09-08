
export const validateFrom = () => {
    
    const contactForm = document.getElementById("contact-form");
    
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault(); // stop form submission for validation first
      let isValid = true;
    
      // clear previous errors
      document.querySelectorAll(".error").forEach(err => err.textContent = "");
    
      const firstName = contactForm.firstName.value.trim();
      const lastName = contactForm.lastName.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();
    
      if (firstName.length === 0) {
        document.getElementById("firstNameError").textContent = "First name is required.";
        isValid = false;
      }
    
      if (lastName.length === 0) {
        document.getElementById("lastNameError").textContent = "Last name is required.";
        isValid = false;
      }
    
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById("emailError").textContent = "Enter a valid email address.";
        isValid = false;
      }
    
      if (message.length < 10) {
        document.getElementById("messageError").textContent = "Message must be at least 10 characters.";
        isValid = false;
      }
    
      if (isValid) {
        alert("Form submitted successfully!");
        contactForm.reset();
      }
    });

}
