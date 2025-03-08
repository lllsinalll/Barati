document.addEventListener("DOMContentLoaded", () => {
    // Dark Mode Functionality
    const initializeDarkMode = () => {
      const isDarkMode = localStorage.getItem("darkMode") === "true";
      document.body.classList.toggle("dark-mode", isDarkMode);
  
      const toggleIcon = document.querySelector(".dark-mode-toggle i");
      if (toggleIcon) {
        toggleIcon.className = isDarkMode ? "fas fa-sun" : "fas fa-moon";
      }
    };
  
    initializeDarkMode();
  
    document.querySelector(".dark-mode-toggle").addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDarkMode = document.body.classList.contains("dark-mode");
  
      const toggleIcon = document.querySelector(".dark-mode-toggle i");
      toggleIcon.className = isDarkMode ? "fas fa-sun" : "fas fa-moon";
      localStorage.setItem("darkMode", isDarkMode);
    });
  
    // Password Visibility Toggle
    document.querySelectorAll(".password-toggle").forEach((toggle) => {
      toggle.addEventListener("click", function () {
        const input = this.parentElement.querySelector("input");
        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";
        this.classList.toggle("fa-eye-slash");
      });
    });
  
    // Form Validation
    document
      .getElementById("registerForm")
      ?.addEventListener("submit", function (e) {
        e.preventDefault();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
  
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        console.log("Registration successful");
      });
  });
  