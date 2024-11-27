document.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash;
    if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    }
});
