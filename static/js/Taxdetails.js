let taxList = [];
    let editIndex = null;
    let deleteIndex = null;

    function openDialog(index = null) {
      const modal = new bootstrap.Modal(document.getElementById('taxModal'));
      if (index !== null) {
        editIndex = index;
        const tax = taxList[index];
        document.getElementById('taxName').value = tax.tax_name;
        document.getElementById('taxPercentage').value = tax.tax_percentage;
        document.getElementById('description').value = tax.description;
      } else {
        editIndex = null;
        document.getElementById('taxForm').reset();
      }
      modal.show();
    }

    function addOrUpdateTax() {
      const taxName = document.getElementById('taxName').value;
      const taxPercentage = document.getElementById('taxPercentage').value;
      const description = document.getElementById('description').value;

      if (!taxName || !taxPercentage) {
        alert('Tax Name and Tax Percentage are required.');
        return;
      }

      const newTax = { tax_name: taxName, tax_percentage: taxPercentage, description };

      if (editIndex !== null) {
        taxList[editIndex] = newTax;
      } else {
        taxList.push(newTax);
      }

      renderTable();
      bootstrap.Modal.getInstance(document.getElementById('taxModal')).hide();
    }

    function renderTable() {
      const tbody = document.getElementById('taxTableBody');
      tbody.innerHTML = '';
      taxList.forEach((tax, index) => {
        const row = `
          <tr>
            <td>${tax.tax_name}</td>
            <td>${tax.tax_percentage}</td>
            <td>${tax.description}</td>
            <td>
              <button class="btn btn-primary btn-sm" onclick="openDialog(${index})">Edit</button>
              <button class="btn btn-danger btn-sm" onclick="confirmDelete(${index})">Delete</button>
            </td>
          </tr>`;
        tbody.innerHTML += row;
      });
    }

    function confirmDelete(index) {
      deleteIndex = index;
      const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
      modal.show();
    }

    function deleteTax() {
      taxList.splice(deleteIndex, 1);
      renderTable();
      bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal')).hide();
    }