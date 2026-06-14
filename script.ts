const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    sidebar?.classList.toggle("open");
  });
}

const themeToggle = document.getElementById("themeToggle");

function setTheme(theme: "dark" | "light") {
  document.body.classList.toggle("dark", theme === "dark");

  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "☀︎" : "☾";
  }

  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme") || "light";

setTheme(savedTheme as "light" | "dark");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.body.classList.contains("dark") ? "dark" : "light";

    setTheme(current === "dark" ? "light" : "dark");
  });
}

document.addEventListener("click", (e) => {
  if (sidebar && !sidebar.contains(e.target) && !menuBtn?.contains(e.target)) {
    sidebar.classList.remove("open");
  }
});
