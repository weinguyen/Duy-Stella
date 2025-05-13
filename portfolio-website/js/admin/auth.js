document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "login.html"
  }
  const logoutBtn = document.getElementById("logout-btn")

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault()
      localStorage.removeItem("adminLoggedIn")
      localStorage.removeItem("token")
      window.location.href = "login.html"
    })
  }
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  }
})
