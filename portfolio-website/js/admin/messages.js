document.addEventListener("DOMContentLoaded", () => {
   const token = localStorage.getItem("token");
  const messagesTableBody = document.getElementById("messages-table-body")
  const messageModal = document.getElementById("message-modal")
  const messageDetails = document.getElementById("message-details")
  const deleteMessageBtn = document.getElementById("delete-message-btn")
  const closeModalBtns = document.querySelectorAll(".close-modal")
  let currentMessageId = null
  fetchMessages()
  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      messageModal.style.display = "none"
    })
  })

  window.addEventListener("click", (e) => {
    if (e.target === messageModal) {
      messageModal.style.display = "none"
    }
  })

  if (deleteMessageBtn) {
    deleteMessageBtn.addEventListener("click", async () => {
      if (currentMessageId) {
        try {
          
          const response = await fetch(`/guest/${currentMessageId}`, {
            method: "DELETE",
            headers: {
          "Authorization": `Bearer ${token}`,
  },
          })
          if (!response.ok) {
            throw new Error("Failed to delete message")
          }

          messageModal.style.display = "none"
          fetchMessages()
        } catch (error) {
          console.error("Error deleting message:", error)
          alert("Failed to delete message. Please try again.")
        }
      }
    })
  }

  async function fetchMessages() {
    try {
      const response = await fetch("/guest", {headers: {
    "Authorization": `Bearer ${token}`,
  },})

      if (!response.ok) {
        throw new Error("Failed to fetch messages")
      }

      const messages = await response.json()

      if (messages.length === 0) {
        messagesTableBody.innerHTML = '<tr><td colspan="5">No messages found.</td></tr>'
        return
      }

      displayMessages(messages)
    } catch (error) {
      console.error("Error fetching messages:", error)
      messagesTableBody.innerHTML = '<tr><td colspan="5">Error loading messages. Please try again later.</td></tr>'
    }
  }

  function displayMessages(messages) {
    messagesTableBody.innerHTML = ""

    messages.forEach((message) => {
      const row = document.createElement("tr")
      const date = message.createdAt ? new Date(message.createdAt).toLocaleDateString() : "N/A"

      row.innerHTML = `
                <td>${message.name}</td>
                <td>${message.email}</td>
                <td>${message.phone}</td>
                <td>${date}</td>
                <td>
                    <button class="action-btn view-btn" data-id="${message.id}">View</button>
                </td>
            `

      messagesTableBody.appendChild(row)
    })
    document.querySelectorAll(".view-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const messageId = btn.getAttribute("data-id")
        const message = messages.find((m) => m.id === messageId)

        if (message) {
          showMessageDetails(message)
        }
      })
    })
  }

  function showMessageDetails(message) {
    currentMessageId = message.id
    const date = message.createdAt ? new Date(message.createdAt).toLocaleDateString() : "N/A"
    messageDetails.innerHTML = `
            <div style="margin-bottom: 20px;">
                <p><strong>From:</strong> ${message.name}</p>
                <p><strong>Email:</strong> ${message.email}</p>
                <p><strong>Phone:</strong> ${message.phone}</p>
                <p><strong>Date:</strong> ${date}</p>
            </div>
            <div>
                <p><strong>Message:</strong></p>
                <p style="background-color:rgb(17, 17, 17); padding: 15px; border-radius: 5px;">${message.message}</p>
            </div>
        `
    messageModal.style.display = "flex"
  }
})
