let financialYearList = [];
    let editIndex = null;
    let deleteIndex = null;

    const openForm = (index = null) => {
      const modal = new bootstrap.Modal(document.getElementById('financialYearModal'));
      document.getElementById('financialYearForm').reset();
      editIndex = index;

      if (index !== null) {
        const year = financialYearList[index];
        document.getElementById('start_date').value = year.start_date;
        document.getElementById('end_date').value = year.end_date;
        document.getElementById('status').value = year.status;
        document.getElementById('financial_year_name').value = year.financial_year_name;
        document.getElementById('description').value = year.description;
      }

      modal.show();
    };

    const updateFinancialYearName = () => {
      const start = document.getElementById('start_date').value;
      const end = document.getElementById('end_date').value;
      if (start && end) {
        const startYear = new Date(start).getFullYear();
        const endYear = new Date(end).getFullYear();
        document.getElementById('financial_year_name').value = `${startYear}-${endYear}`;
      }
    };

    const addOrUpdateFinancialYear = () => {
      const year = {
        start_date: document.getElementById('start_date').value,
        end_date: document.getElementById('end_date').value,
        status: document.getElementById('status').value === 'true',
        financial_year_name: document.getElementById('financial_year_name').value,
        description: document.getElementById('description').value
      };

      if (editIndex !== null) {
        financialYearList[editIndex] = year;
      } else {
        financialYearList.push(year);
      }

      updateTable();
      bootstrap.Modal.getInstance(document.getElementById('financialYearModal')).hide();
    };

    const updateTable = () => {
      const tableBody = document.getElementById('financialYearTable');
      tableBody.innerHTML = '';
      financialYearList.forEach((year, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${year.financial_year_name}</td>
          <td>${year.start_date}</td>
          <td>${year.end_date}</td>
          <td>${year.status ? 'Active' : 'Inactive'}</td>
          <td>${year.description}</td>
          <td>
            <button class="btn btn-sm btn-primary me-2" onclick="openForm(${index})">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="confirmDelete(${index})">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    };

    const confirmDelete = (index) => {
      deleteIndex = index;
      const modal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
      modal.show();
    };

    const deleteFinancialYear = () => {
      financialYearList.splice(deleteIndex, 1);
      updateTable();
      bootstrap.Modal.getInstance(document.getElementById('deleteConfirmModal')).hide();
    };