
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form")
  const formStatus = document.getElementById("form-status")

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault()
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        message: document.getElementById("message").value,
      }

      try {
        const response = await fetch("/guest", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
        if (!response.ok) {
          throw new Error("Failed to send message")
        }

        contactForm.reset()
        formStatus.className = "success"
        formStatus.textContent = "Your message has been sent successfully!"
        setTimeout(() => {
          formStatus.textContent = ""
          formStatus.className = ""
        }, 5000)
      } catch (error) {
        console.error("Error sending message:", error)
        formStatus.className = "error"
        formStatus.textContent = "Failed to send message. Please try again later."
      }
    })
  }
})
