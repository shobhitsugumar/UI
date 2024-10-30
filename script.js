document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const sidebar = document.querySelector(".sidebar");
  const mainContent = document.querySelector(".main-content");
  const collapseBtn = document.querySelector(".collapse-btn");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const menuItems = document.querySelectorAll(".menu-item");
  const themeToggle = document.querySelector(".theme-toggle");

  // Theme Management
  function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");

    // Update theme toggle icon
    const themeIcon = themeToggle.querySelector("i");
    themeIcon.className = isDark ? "fas fa-moon" : "fas fa-sun";

    // Save theme preference
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.querySelector("i").className = "fas fa-moon";
  }

  // Sidebar Toggle for Desktop
  function toggleSidebar() {
    sidebar.classList.toggle("collapsed");
    mainContent.classList.toggle("expanded");
  }

  // Mobile Menu Toggle
  function toggleMobileMenu() {
    sidebar.classList.toggle("mobile-show");
  }

  // Submenu Toggle
  function toggleSubmenu(menuItem) {
    const isActive = menuItem.classList.contains("active");

    // Close all other submenus
    menuItems.forEach((item) => {
      if (item !== menuItem) {
        item.classList.remove("active");
        const arrow = item.querySelector(".arrow");
        if (arrow) arrow.style.transform = "rotate(0deg)"; // Reset arrow rotation
      }
    });

    // Toggle current submenu
    menuItem.classList.toggle("active");

    // Rotate arrow icon for the active menu item
    const arrow = menuItem.querySelector(".arrow");
    if (arrow) {
      arrow.style.transform = isActive ? "rotate(0deg)" : "rotate(180deg)";
    }
  }

  // Event Listeners
  themeToggle.addEventListener("click", toggleTheme);
  collapseBtn.addEventListener("click", toggleSidebar);
  mobileMenuBtn.addEventListener("click", toggleMobileMenu);

  // Add click event to menu items with submenu
  menuItems.forEach((menuItem) => {
    const menuHeader = menuItem.querySelector(".menu-header");
    const hasSubmenu = menuItem.querySelector(".submenu");

    if (hasSubmenu && menuHeader) {
      menuHeader.addEventListener("click", () => toggleSubmenu(menuItem));
    }
  });
});
