const toggleButton = document.querySelector(".fa-bars");
const headerLinks = document.querySelector(".header-links");

toggleButton.addEventListener("click", () => {
    headerLinks.classList.toggle("active");
})