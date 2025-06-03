document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.getElementById("projects-container")
  const modal = document.getElementById("project-modal")
  const closeModal = document.querySelector(".close-modal")

  if (projectsContainer) {
    fetchProjects()
  }

  // Close modal when clicking X button
  closeModal.addEventListener("click", () => {
    modal.style.display = "none"
  })

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none"
    }
  })

  function showProjectModal(project) {
    document.getElementById("modal-title").textContent = project.title
    document.getElementById("modal-image").src = project.image
    document.getElementById("modal-description").textContent = project.description
    document.getElementById("modal-github").href = project.github
    document.getElementById("modal-demo").href = project.demo || "#"
    
    // Hide demo link if no demo URL exists
    const demoLink = document.getElementById("modal-demo")
    if (!project.demo) {
      demoLink.style.display = "none"
    } else {
      demoLink.style.display = "inline-block"
    }
    
    modal.style.display = "flex"
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
            <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-info">
            <h3>${project.title}</h3>
            <button class="btn btn-primary view-details">View Details</button>
        </div>
      `

      // Add click event to view details button
      const viewDetailsBtn = projectCard.querySelector(".view-details")
      viewDetailsBtn.addEventListener("click", () => {
        showProjectModal(project)
      })

      projectsContainer.appendChild(projectCard)
    })
  }
})