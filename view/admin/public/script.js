function xemthongtin() {
    fetch("https://localhost/xemthongtin")
        .then(res => res.json())
        .then(data => {
            var tableContainer = document.getElementById("table");
            tableContainer.innerHTML = "";

            var table = document.createElement("table");
            var headerRow = document.createElement("tr");
            var headers = ["ID", "Tên", "Email", "SĐT", "Tin nhắn", "Hành động"];

            headers.forEach(headerText => {
                var header = document.createElement("th");
                header.textContent = headerText;
                headerRow.appendChild(header);
            });

            table.appendChild(headerRow);

            data.forEach(item => {
                var row = document.createElement("tr");

                Object.values(item).forEach(text => {
                    var cell = document.createElement("td");
                    cell.textContent = text;
                    row.appendChild(cell);
                });


                var deleteCell = document.createElement("td");
                var deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Xóa";
                deleteBtn.classList.add("delete-btn");
                deleteBtn.onclick = () => xoathongtin(item._id);
                deleteCell.appendChild(deleteBtn);
                row.appendChild(deleteCell);

                table.appendChild(row);
            });

            tableContainer.appendChild(table);
        })
        .catch(error => console.error('Lỗi:', error));
        fetch("https://localhost/xemproject")
        .then(res => res.json())
        .then(data => {
            var tableContainer = document.getElementById("project");
            tableContainer.innerHTML = "";

            var table = document.createElement("table");
            var headerRow = document.createElement("tr");
            var headers = ["ID", "Tiêu đề", "Mô tả", "Github", "Ảnh"];

            headers.forEach(headerText => {
                var header = document.createElement("th");
                header.textContent = headerText;
                headerRow.appendChild(header);
            });

            table.appendChild(headerRow);

            data.forEach(item => {
            

                var row = document.createElement("tr");

                Object.values(item).forEach(text => {
                    img = document.createElement("img");
                    img.src = item.image;
                    img.style.width = "70px";
                    if(text == item.image)
                        row.appendChild(img);
                    else{
                    var cell = document.createElement("td");
                    cell.textContent = text;
                    row.appendChild(cell);}
                });


                var deleteCell = document.createElement("td");
                var deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Xóa";
                deleteBtn.classList.add("delete-btn");
                deleteBtn.onclick = () => xoaproject(item._id);
                deleteCell.appendChild(deleteBtn);
                row.appendChild(deleteCell);

                table.appendChild(row);
            });

            tableContainer.appendChild(table);
        })

}

function xoathongtin(id) {
    fetch("https://localhost/xoathongtin", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id }),
    })
    .then(res => res.text())
    .then(() => xemthongtin())
    .catch(error => console.error(error));
}
function xoaproject(id) {
    fetch("https://localhost/xoaproject", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id }),
    })
    .then(res => res.text())
    .then(() => xemthongtin())
    .catch(error => console.error(error));
}

function uploadData() {
    let formData = new FormData();
    formData.append("image", document.getElementById("imageInput").files[0]);

    fetch("https://localhost/upload", { method: "POST", body: formData })
    .then(response => response.text())
    .then(imgurl => {
        const data = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            github: document.getElementById("github").value,
            image: imgurl
        };
        return fetch("https://localhost/guiproject", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    })
    .then(res => res.text())
    .then((data) => alert(data))
    .catch(error => console.error(error));
}


window.onload = xemthongtin;