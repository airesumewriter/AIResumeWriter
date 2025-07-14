document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const sidebarNav = document.getElementById('sidebarNav');
  if (menuBtn && sidebarNav) {
    menuBtn.addEventListener('click', () => {
      sidebarNav.classList.toggle('nav-expanded');
      sidebarNav.classList.toggle('nav-collapsed');
    });
  }
});