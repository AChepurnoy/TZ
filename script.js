function saveContact() {
    const name = document.getElementById('name').value;
    const status = document.getElementById('status').value;
    const phone = document.getElementById('phone').value;

    if (name && status && phone) {
        // Создание новой строки в таблице
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
                <td>${name}</td>
                <td>${status}</td>
                <td>${phone}</td>
                <td>
                    <button class="btn btn-secondary" onclick="editContact(this)">Редактировать</button>
                    <button class="btn btn-danger" onclick="confirmDelete(this)">Удалить</button>
                </td>
            `;

        document.querySelector('#contacts tbody').appendChild(newRow);
        closePopup();
    } else {
        alert('Пожалуйста, заполните все поля.');
    }
}
function showAddForm() {
    document.getElementById('popup').style.display = 'block';
    $('#popup').modal('show');
}

let currentRow;
function editContact(button) {
    currentRow = button.closest('tr');
    const nameCell = currentRow.querySelector('td:nth-child(1)');
    const statusCell = currentRow.querySelector('td:nth-child(2)');
    const phoneCell = currentRow.querySelector('td:nth-child(3)');

    document.getElementById('editName').value = nameCell.textContent;
    document.getElementById('editStatus').value = statusCell.textContent;
    document.getElementById('editPhone').value = phoneCell.textContent;

    $('#popup_edit').modal('show');
}
function saveEditedContact() {
    const newName = document.getElementById('editName').value;
    const newStatus = document.getElementById('editStatus').value;
    const newPhone = document.getElementById('editPhone').value;

    if (newName && newStatus && newPhone) {
        // Обновляем данные в текущей строке таблицы
        const nameCell = currentRow.querySelector('td:nth-child(1)');
        const statusCell = currentRow.querySelector('td:nth-child(2)');
        const phoneCell = currentRow.querySelector('td:nth-child(3)');
        // Обновляем данные в строке таблицы
        nameCell.textContent = newName;
        statusCell.textContent = newStatus;
        phoneCell.textContent = newPhone;

        closePopup();
    } else {
        alert('Пожалуйста, заполните все поля.');
    }
}
function confirmDelete(button) {
    const row = button.closest('tr');
    const popup = document.getElementById('confirm-delete-popup');

    $('#confirm-delete-popup').modal('show');

    // Сохраняем ссылку на строку, которую нужно удалить, в атрибуте попапа
    popup.setAttribute('data-row-to-delete', row.rowIndex);
}

function deleteContact() {
    const popup = document.getElementById('confirm-delete-popup');
    const rowIndex = popup.getAttribute('data-row-to-delete');
    document.querySelector(`#contacts tbody tr:nth-child(${rowIndex})`).remove();
    closePopup();
}

function cancelDelete() {
    closePopup();
}

function closePopup() {
    $('#popup').modal('hide');
    $('#popup_edit').modal('hide');
    $('#confirm-delete-popup').modal('hide');
}