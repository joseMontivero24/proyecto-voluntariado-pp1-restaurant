
const menu = document.querySelector(".menu");
const menuList = document.querySelector(".menu-list");
const menuBtn = document.querySelector(".menu-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const menuOptions = document.querySelectorAll(".menu-list-item");

// Función para cambiar el color de fondo del menú al hacer scroll
function handleScroll() {
    if (window.scrollY > 100) {
        menu.classList.add("sticky");
        menu.style.backgroundColor = "#333";
    } else {
        menu.classList.remove("sticky");
        menu.style.backgroundColor = "transparent";
    }
}

// Evento para cambiar el color del menú al hacer scroll
window.addEventListener("scroll", handleScroll);

menuBtn.onclick = () => {
    menuList.classList.add("active");
    menuBtn.classList.add("hide");
};

cancelBtn.onclick = () => {
    menuList.classList.remove("active");
    menuBtn.classList.remove("hide");
};

menuOptions.forEach(option => {
    option.addEventListener("click", () => {
        menuList.classList.remove("active");
        menuBtn.classList.remove("hide");
    });
});

