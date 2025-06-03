document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  }
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navLinks.classList.remove("active")
    })
  })
  const sections = document.querySelectorAll("section")

  function checkSections() {
    const triggerBottom = (window.innerHeight / 5) * 4

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top

      if (sectionTop < triggerBottom) {
        section.style.opacity = "1"
        section.style.transform = "translateY(0)"
      }
    })
  }
  sections.forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(50px)"
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  })

  window.addEventListener("load", checkSections)
  window.addEventListener("scroll", checkSections)
})
