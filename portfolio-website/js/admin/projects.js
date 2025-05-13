
document.addEventListener("DOMContentLoaded", () => {
  token = localStorage.getItem("token")
  const projectsTableBody = document.getElementById("projects-table-body")
  const addProjectBtn = document.getElementById("add-project-btn")
  const projectModal = document.getElementById("project-modal")
  const viewProjectModal = document.getElementById("view-project-modal")
  const projectForm = document.getElementById("project-form")
  const projectDetails = document.getElementById("project-details")
  const deleteProjectBtn = document.getElementById("delete-project-btn")
  const closeModalBtns = document.querySelectorAll(".close-modal")
  const imagePreview = document.getElementById("image-preview")
  const projectImageInput = document.getElementById("project-image")

  // Current project ID for delete operation
  let currentProjectId = null

  // Fetch projects
  fetchProjects()

  // Show add project modal
  if (addProjectBtn) {
    addProjectBtn.addEventListener("click", () => {
      projectForm.reset()
      projectModal.style.display = "flex"
    })
  }

  // Close modals when clicking on close button
  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      projectModal.style.display = "none"
      viewProjectModal.style.display = "none"
    })
  })

  // Close modals when clicking outside of them
  window.addEventListener("click", (e) => {
    if (e.target === projectModal) {
      projectModal.style.display = "none"
    }
    if (e.target === viewProjectModal) {
      viewProjectModal.style.display = "none"
    }
  })

  // Image preview
  if (projectImageInput) {
    projectImageInput.addEventListener("input", () => {
      const imageUrl = projectImageInput.value
      if (imageUrl) {
        imagePreview.src = imageUrl
      } else {
        imagePreview.src = "https://via.placeholder.com/300x200"
      }
    })

  }

  // Add project form submission
  if (projectForm) {
    projectForm.addEventListener("submit", async (e) => {
      e.preventDefault()

const imageInput = document.getElementById('project-image').files[0];
if (!imageInput) {
  alert("Vui lòng chọn ảnh.");
  return;
}

// Chuẩn bị FormData để gửi tới ImgBB
let formdata = new FormData();
formdata.append('key', '5fd16c9768b32d05ff318d4826ef0712');
formdata.append('image', imageInput);

try {
  // Upload ảnh lên ImgBB
  const res = await fetch('https://api.imgbb.com/1/upload', {
    method: 'POST',
    body: formdata
  });

  const data = await res.json();
  if (!data.success) {
    throw new Error("Upload ảnh thất bại: " + data.error.message);
  }

  const imageUrl = data.data.url; // URL ảnh trả về
  console.log(imageUrl)
  // Tạo dữ liệu project
  const formData = {
    title: document.getElementById("project-title").value,
    description: document.getElementById("project-description").value,
    github: document.getElementById("project-github").value,
    image: imageUrl
  };

  // Gửi dữ liệu project tới server của bạn
  const response = await fetch("/project", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Thêm project thất bại");
  }

  projectModal.style.display = "none";
  fetchProjects();

} catch (error) {
  console.error("Lỗi khi thêm project:", error);
  alert("Không thể thêm project. Vui lòng thử lại.");
}

    })
  }
  if (deleteProjectBtn) {
    deleteProjectBtn.addEventListener("click", async () => {
      if (currentProjectId) {
        try {
          const response = await fetch(`/project/${currentProjectId}`, {
            method: "DELETE",
             headers: {
          "Authorization": `Bearer ${token}`
        },
          })

          if (!response.ok) {
            throw new Error("Failed to delete project")
          }
          viewProjectModal.style.display = "none"
          fetchProjects()
        } catch (error) {
          console.error("Error deleting project:", error)
          alert("Failed to delete project. Please try again.")
        }
      }
    })
  }

  async function fetchProjects() {
    try {
      const response = await fetch("/project")

      if (!response.ok) {
        throw new Error("Failed to fetch projects")
      }

      const projects = await response.json()

      if (projects.length === 0) {
        projectsTableBody.innerHTML = '<tr><td colspan="5">No projects found.</td></tr>'
        return
      }

      displayProjects(projects)
    } catch (error) {
      console.error("Error fetching projects:", error)
      projectsTableBody.innerHTML = '<tr><td colspan="5">Error loading projects. Please try again later.</td></tr>'
    }
  }

  function displayProjects(projects) {
    projectsTableBody.innerHTML = ""

    projects.forEach((project) => {
      const row = document.createElement("tr")

      row.innerHTML = `
                <td><img src="${project.image}" alt="${project.title}" style="width: 80px; height: 50px; object-fit: cover; border-radius: 4px;"></td>
                <td>${project.title}</td>
                <td>${project.description.substring(0, 50)}${project.description.length > 50 ? "..." : ""}</td>
                <td><a href="${project.github}" target="_blank">${project.github.substring(0, 30)}...</a></td>
                <td>
                    <button class="action-btn view-btn" data-id="${project.id}">View</button>
                </td>
            `

      projectsTableBody.appendChild(row)
    })

    // Add event listeners to view buttons
    document.querySelectorAll(".view-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const projectId = btn.getAttribute("data-id")
        const project = projects.find((p) => p.id === projectId)

        if (project) {
          showProjectDetails(project)
        }
      })
    })
  }

  function showProjectDetails(project) {
    currentProjectId = project.id
    projectDetails.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="/${project.image}" alt="${project.title}" style="max-width: 100%; max-height: 300px; border-radius: 8px;">
            </div>
            <div>
                <p><strong>Title:</strong> ${project.title}</p>
                <p><strong>Description:</strong> ${project.description}</p>
                <p><strong>GitHub:</strong> <a href="${project.github}" target="_blank">${project.github}</a></p>
            </div>
        `
    viewProjectModal.style.display = "flex"
  }
})
