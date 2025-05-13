document.addEventListener("DOMContentLoaded", () => {
  token = localStorage.getItem("token");
  fetchDashboardData()
  async function fetchDashboardData() {
    try {
      const messagesResponse = await fetch("/guest", {headers: {
    "Authorization": `Bearer ${token}`,
  },})

      if (!messagesResponse.ok) {
        throw new Error("Failed to fetch messages")
      }

      const messages = await messagesResponse.json()

      document.getElementById("total-messages").textContent = messages.length

      displayRecentMessages(messages.slice(0, 3))

      const projectsResponse = await fetch("/project",{headers: {
    "Authorization": `Bearer ${token}`,
  },})

      if (!projectsResponse.ok) {
        throw new Error("Failed to fetch projects")
      }
      const projects = await projectsResponse.json()
      document.getElementById("total-projects").textContent = projects.length
      displayRecentProjects(projects.slice(0, 3))
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    }
  }
  function displayRecentMessages(messages) {
    const recentMessagesContainer = document.getElementById("recent-messages")
    if (messages.length === 0) {
      recentMessagesContainer.innerHTML = "<p>No messages found.</p>"
      return
    }

    let html = '<table class="admin-table">'
    html += `
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                </tr>
            </thead>
            <tbody>
        `

    messages.forEach((message) => {
      html += `
                <tr>
                    <td>${message.name}</td>
                    <td>${message.email}</td>
                    <td>${message.message.substring(0, 50)}${message.message.length > 50 ? "..." : ""}</td>
                </tr>
            `
    })

    html += "</tbody></table>"

    recentMessagesContainer.innerHTML = html
  }

  function displayRecentProjects(projects) {
    const recentProjectsContainer = document.getElementById("recent-projects")

    if (projects.length === 0) {
      recentProjectsContainer.innerHTML = "<p>No projects found.</p>"
      return
    }

    let html = '<table class="admin-table">'
    html += `
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
        `

    projects.forEach((project) => {
      html += `
                <tr>
                    <td><img src="/${project.image}" alt="${project.title}" style="width: 80px; height: 50px; object-fit: cover; border-radius: 4px;"></td>
                    <td>${project.title}</td>
                    <td>${project.description.substring(0, 50)}${project.description.length > 50 ? "..." : ""}</td>
                </tr>
            `
    })

    html += "</tbody></table>"

    recentProjectsContainer.innerHTML = html
  }
})
