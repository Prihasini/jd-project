document.addEventListener('DOMContentLoaded', function () {
    const modal = document.querySelectorAll('.modal');
    const modalInstances = M.Modal.init(modal);
  
    const categoryTable = document.getElementById('categoryTable').getElementsByTagName('tbody')[0];
    const openModalBtn = document.getElementById('openModalBtn');
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const categoryModal = M.Modal.getInstance(document.getElementById('categoryModal'));
    const deleteModal = M.Modal.getInstance(document.getElementById('deleteModal'));
  
    let categoryList = [];
    let editIndex = null;
    let deleteIndex = null;
  
    const categoryNameInput = document.getElementById('categoryName');
    const categoryCodeInput = document.getElementById('categoryCode');
    const descriptionInput = document.getElementById('description');
  
    function renderTable() {
      categoryTable.innerHTML = '';
      categoryList.forEach((category, index) => {
        const row = categoryTable.insertRow();
        row.insertCell(0).textContent = category.category_name;
        row.insertCell(1).textContent = category.category_code;
        row.insertCell(2).textContent = category.description;
        const actionsCell = row.insertCell(3);
        actionsCell.innerHTML = `
          <button class="btn-small yellow darken-2" onclick="editCategory(${index})">Edit</button>
          <button class="btn-small red" onclick="deleteCategory(${index})">Delete</button>
        `;
      });
    }
  
    openModalBtn.addEventListener('click', () => {
      editIndex = null;
      categoryNameInput.value = '';
      categoryCodeInput.value = '';
      descriptionInput.value = '';
      M.updateTextFields();
      categoryModal.open();
    });
  
    saveBtn.addEventListener('click', () => {
      const categoryDetails = {
        category_name: categoryNameInput.value,
        category_code: categoryCodeInput.value,
        description: descriptionInput.value,
      };
      if (editIndex !== null) {
        categoryList[editIndex] = categoryDetails;
      } else {
        categoryList.push(categoryDetails);
      }
      renderTable();
      categoryModal.close();
    });
  
    window.editCategory = function(index) {
      editIndex = index;
      const category = categoryList[index];
      categoryNameInput.value = category.category_name;
      categoryCodeInput.value = category.category_code;
      descriptionInput.value = category.description;
      M.updateTextFields();
      categoryModal.open();
    };
  
    window.deleteCategory = function(index) {
      deleteIndex = index;
      deleteModal.open();
    };
  
    document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
      categoryList.splice(deleteIndex, 1);
      renderTable();
      deleteModal.close();
    });
  
    renderTable();
  });
  