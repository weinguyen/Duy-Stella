function fetchProjects() {
    fetch("https://localhost/xemproject")
        .then(res => res.json())
        .then(data => {
            let projects = document.getElementById("container");
            projects.innerHTML = ""; 
            data.forEach(project => {
                projects.innerHTML += `
                    <div class="project-card">
                        <img src="${project.image}" alt="Project 3">
                        <h3>${project.title}</h3>
                        <button class="btn" 
                            data-title="${project.title}" 
                            data-description="${project.description}"
                            data-github="${project.github}" 
                            data-image="${project.image}" 
                            onclick='openmodal(${JSON.stringify(project)})'>Xem chi tiết</button>
                    </div>
                `;
            });
        })
}

function openmodal(project) {
    document.getElementById("modal-title").textContent = project.title;
    document.getElementById("modal-description").textContent = project.description;
    document.getElementById("modal-github").href = project.github;
   document.getElementById("modal-image").src = project.image;
    document.getElementById("projectModal").classList.add("show");
    document.getElementById("projectModal").style.zIndex="9999";
}

function closeModal() {
    document.getElementById("projectModal").classList.remove("show");
    document.getElementById("projectModal").style.zIndex="-1";
}

window.onload = fetchProjects;
