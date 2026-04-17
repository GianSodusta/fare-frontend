// ==========================================
// TrikeFare Shared Utilities
// ==========================================

const API_URL = "https://fare-backend.onrender.com";

// --- Toast Notifications ---
function showToast(message, type = "info") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const icons = { success: "✓", error: "✕", info: "ℹ" };
  toast.innerHTML = `<span>${icons[type] || "ℹ"}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = "slideOut .3s ease forwards";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// --- Sidebar toggle ---
function initSidebar() {
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const closeBtn = document.getElementById("sidebar-close");

  function openSidebar() {
    sidebar?.classList.add("open");
    overlay?.classList.add("show");
    hamburger?.classList.add("open");
  }
  function closeSidebar() {
    sidebar?.classList.remove("open");
    overlay?.classList.remove("show");
    hamburger?.classList.remove("open");
  }

  hamburger?.addEventListener("click", () => {
    if (sidebar?.classList.contains("open")) closeSidebar();
    else openSidebar();
  });
  overlay?.addEventListener("click", closeSidebar);
  closeBtn?.addEventListener("click", closeSidebar);
}

// --- Preloader ---
function initPreloader() {
  window.addEventListener("load", () => {
    setTimeout(() => document.body.classList.add("loaded"), 500);
  });
}

// --- User profile in sidebar ---
function loadUserProfile() {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const nameEl = document.getElementById("sidebar-name");
    const emailEl = document.getElementById("sidebar-email");
    const avatarEl = document.getElementById("sidebar-avatar");

    if (nameEl) nameEl.textContent = `${user.firstname || "User"} ${user.lastname || ""}`.trim();
    if (emailEl) emailEl.textContent = user.email || "";
    if (avatarEl && user.profile_pic) avatarEl.src = user.profile_pic;
  } catch (e) {
    console.warn("Could not load user profile:", e);
  }
}

// --- Logout ---
function logout() {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "index.html";
}

// --- Format currency ---
function formatPHP(amount) {
  return "₱" + Number(amount).toFixed(2);
}

// --- Format date ---
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-PH", {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

// --- Geocode wrapper ---
async function geocodeQuery(query) {
  const res = await fetch(
    `${API_URL}/geocode?query=${encodeURIComponent(query + ", Koronadal City")}`
  );
  if (!res.ok) throw new Error("Geocode failed");
  return res.json();
}

// --- Auth guard ---
function requireAuth() {
  const user = localStorage.getItem("user");
  if (!user) {
    window.location.href = "index.html";
    return null;
  }
  return JSON.parse(user);
}

// --- Init all common stuff ---
document.addEventListener("DOMContentLoaded", () => {
  initSidebar();
  loadUserProfile();

  // Logout button wiring
  document.getElementById("logoutBtn")?.addEventListener("click", () => {
    if (confirm("Are you sure you want to sign out?")) logout();
  });
});
