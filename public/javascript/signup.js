function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form and elements
const form = document.getElementById('registerForm');
const emailInput = document.getElementById('emailInput');
const emailError = document.getElementById('emailError');

// Add event listener to the form
form.addEventListener('submit', function (event) {
    if (!isValidEmail(emailInput.value)) {
        event.preventDefault(); // Prevent form submission
        emailError.classList.remove('hidden'); // Show error message
    } else {
        emailError.classList.add('hidden'); // Hide error message if valid
    }
});

// Add real-time validation on input change
emailInput.addEventListener('input', function () {
    if (isValidEmail(emailInput.value)) {
        emailError.classList.add('hidden'); // Hide error message if valid
    }
});


