    function togglePasswordVisibility(button) {
        const input = button.previousElementSibling;
        if (input.type === 'password') {
            input.type = 'text';
            button.textContent = 'Hide';
        } else {
            input.type = 'password';
            button.textContent = 'Show';
        }

    }

        function toggleMenu() {
            var menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }

