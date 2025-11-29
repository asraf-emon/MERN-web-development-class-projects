// === SELECT ELEMENTS ===
const navLinks = document.querySelectorAll(".nav-links li");
const menuBtn = document.querySelector(".mobile-menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const overflow = document.querySelector(".overflow");
const mobileLinks = document.querySelectorAll(".mobile-links li");

// === MOBILE MENU TOGGLE ===
menuBtn.addEventListener("click", () => {
  const icon = menuBtn.querySelector("img");
  const isActive = menuBtn.classList.toggle("active-btn");

  mobileMenu.classList.toggle("active-menu");
  overflow.classList.toggle("active-menu");

  icon.src = isActive
    ? "./assets/images/icon-close-menu.svg"
    : "./assets/images/icon-menu.svg";
});

// === DESKTOP DROPDOWNS (Only one open at a time) ===
navLinks.forEach((link) => {
  const subMenu = link.querySelector(".sub-menu");
  if (!subMenu) return;

  link.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent event bubbling

    // Close all other dropdowns first
    navLinks.forEach((otherLink) => {
      if (otherLink !== link) {
        otherLink.classList.remove("active");
        const otherSub = otherLink.querySelector(".sub-menu");
        if (otherSub) otherSub.classList.remove("active-menu");
      }
    });

    // Toggle the clicked one
    link.classList.toggle("active");
    subMenu.classList.toggle("active-menu");
  });
});

// === MOBILE DROPDOWNS (Only one open at a time) ===
mobileLinks.forEach((link) => {
  const subMenu = link.querySelector(".mobile-sub");
  const arrow = link.querySelector(".arrow");
  if (!subMenu) return;

  link.addEventListener("click", (e) => {
    e.stopPropagation();

    // Close other dropdowns first
    mobileLinks.forEach((otherLink) => {
      if (otherLink !== link) {
        otherLink.classList.remove("active");
        const otherSub = otherLink.querySelector(".mobile-sub");
        const otherArrow = otherLink.querySelector(".arrow");
        if (otherSub) otherSub.classList.remove("active-menu");
        if (otherArrow) otherArrow.classList.remove("active");
      }
    });

    // Toggle clicked dropdown
    subMenu.classList.toggle("active-menu");
    arrow.classList.toggle("active");
  });
});

// === CLOSE MENU WHEN OVERLAY CLICKED ===
overflow.addEventListener("click", () => {
  menuBtn.classList.remove("active-btn");
  mobileMenu.classList.remove("active-menu");
  overflow.classList.remove("active-menu");
  menuBtn.querySelector("img").src = "./assets/images/icon-menu.svg";
});
