
document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.getElementById("projects-container")

  if (projectsContainer) {
    fetchProjects()
  }

  async function fetchProjects() {
    try {
      const response = await fetch("/project")
      if (!response.ok) {
        throw new Error("Failed to fetch projects")
      }
      const projects = await response.json()
      if (projects.length === 0) {
        projectsContainer.innerHTML = '<p class="loading">No projects found.</p>'
        return
      }
      displayProjects(projects)
    } catch (error) {
      console.error("Error fetching projects:", error)
      projectsContainer.innerHTML = '<p class="loading">Error loading projects. Please try again later.</p>'
    }
  }

  function displayProjects(projects) {
    projectsContainer.innerHTML = ""

    projects.forEach((project) => {
      const projectCard = document.createElement("div")
      projectCard.className = "project-card"

      projectCard.innerHTML = `
                <div class="project-image">
                    <img src="/${project.image}" alt="${project.title}">
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-links">
                        <a href="${project.github}" target="_blank">
                            <i class="fab fa-github"></i> GitHub
                        </a>
                    </div>
                </div>
            `

      projectsContainer.appendChild(projectCard)
    })
  }
})
