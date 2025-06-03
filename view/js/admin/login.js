document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form")
  const loginStatus = document.getElementById("login-status")

  // Nếu đã đăng nhập => chuyển đến dashboard
  if (localStorage.getItem("adminLoggedIn") === "true") {
    window.location.href = "dashboard.html"
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const username = document.getElementById("username").value
      const password = document.getElementById("password").value

      try {
        const response = await fetch("/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username :username , password:password }),
        })

        if (!response.ok) {
          throw new Error("Đăng nhập thất bại")
        }
        const data = await response.json()
        if (data.access_token) {
          localStorage.setItem("adminLoggedIn", "true")
          localStorage.setItem("token", data.access_token)
          window.location.href = "dashboard.html"
        } else {
          loginStatus.className = "error"
          loginStatus.textContent = "Tài khoản hoặc mật khẩu không đúng"
        }
      } catch (err) {
        loginStatus.className = "error"
        loginStatus.textContent = "Lỗi đăng nhập: " + err.message
      }
    })
  }
})
