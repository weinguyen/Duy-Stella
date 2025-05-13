const url = BACKEND_URL;

function xemthongtin() {
  fetch(url + '/guest')
    .then((res) => res.json())
    .then((data) => {
      var tableContainer = document.getElementById('table');
      tableContainer.innerHTML = '';

      var table = document.createElement('table');
      var headerRow = document.createElement('tr');
      var headers = ['ID', 'Name', 'Email', 'Phone', 'Message', 'Create-At'];

      headers.forEach((headerText) => {
        var header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
      });

      table.appendChild(headerRow);

      data.forEach((item) => {
        var row = document.createElement('tr');

        Object.values(item).forEach((text) => {
          var cell = document.createElement('td');
          cell.textContent = text;
          row.appendChild(cell);
        });

        var deleteCell = document.createElement('td');
        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Xóa';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => xoathongtin(item.id);
        deleteCell.appendChild(deleteBtn);
        row.appendChild(deleteCell);

        table.appendChild(row);
      });

      tableContainer.appendChild(table);
    })
    .catch((error) => console.error('Lỗi:', error));
  fetch(url + '/project')
    .then((res) => res.json())
    .then((data) => {
      var tableContainer = document.getElementById('project');
      tableContainer.innerHTML = '';

      var table = document.createElement('table');
      var headerRow = document.createElement('tr');
      var headers = ['ID', 'Tiêu đề', 'Mô tả', 'Github', 'Ảnh'];

      headers.forEach((headerText) => {
        var header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
      });

      table.appendChild(headerRow);

      data.forEach((item) => {
        var row = document.createElement('tr');
        row.setAttribute('data-id', item.id);

        Object.values(item).forEach((text) => {
          img = document.createElement('img');
          img.src = url + '/' + item.image;
          img.style.width = '70px';
          if (text == item.image) row.appendChild(img);
          else {
            var cell = document.createElement('td');
            cell.textContent = text;
            row.appendChild(cell);
          }
        });

        var deleteCell = document.createElement('td');
        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Xóa';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => xoaproject(item.id);
        deleteCell.appendChild(deleteBtn);
        row.appendChild(deleteCell);

        table.appendChild(row);
      });

      tableContainer.appendChild(table);
    });
}

function xoathongtin(id) {
  console.log(id);
  fetch(url + `/guest/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.text())
    .then(() => xemthongtin())
    .catch((error) => console.error(error));
}
function xoaproject(id) {
  fetch(url + `/project/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.text())
    .then(() => xemthongtin())
    .catch((error) => console.error(error));
}

function uploadData() {
  let formData = new FormData();
  formData.append('image', document.getElementById('imageInput').files[0]);
  console.log(formData.get('image'));
  fetch(url + '/project/upload', { method: 'POST', body: formData })
    .then((response) => response.text())
    .then((imgurl) => {
      const data = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        github: document.getElementById('github').value,
        image: imgurl,
      };

      return fetch(url + '/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    })
    .then((res) => {
      if (res.ok) {
        alert('Thêm thành công');
        xemthongtin();
      }
    })
    .catch((error) => console.error(error));
}

window.onload = xemthongtin;
