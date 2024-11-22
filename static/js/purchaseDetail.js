let itemList = [];
    let editIndex = null;
    let deleteIndex = null;

    const partyNameSelect = document.getElementById('partyName');
    const addressInput = document.getElementById('address');
    const itemInput = document.getElementById('item');
    const voucherNumberInput = document.getElementById('voucherNumber');
    const voucherDateInput = document.getElementById('voucherDate');
    const quantityInput = document.getElementById('quantity');
    const rateInput = document.getElementById('rate');
    const discountInput = document.getElementById('discountPercentage');
    const gstInput = document.getElementById('gstPercentage');
    const tableBody = document.getElementById('itemTableBody');
    const errorAlert = document.getElementById('errorAlert');

    const showError = (message) => {
      errorAlert.textContent = message;
      errorAlert.classList.remove('d-none');
    };

    const hideError = () => {
      errorAlert.classList.add('d-none');
    };

    const resetFormFields = () => {
      partyNameSelect.value = '';
      addressInput.value = '';
      itemInput.value = '';
      voucherNumberInput.value = '';
      voucherDateInput.value = '';
      quantityInput.value = '';
      rateInput.value = '';
      discountInput.value = '';
      gstInput.value = '';
    };

    const updateTable = () => {
      tableBody.innerHTML = '';
      itemList.forEach((item, index) => {
        const row = `
          <tr>
            <td>${item.partyName}</td>
            <td>${item.address}</td>
            <td>${item.item}</td>
            <td>${item.quantity}</td>
            <td>${item.rate}</td>
            <td>${item.discountPercentage}</td>
            <td>${item.gstPercentage}</td>
            <td>
              <button class="btn btn-sm btn-primary" onclick="editItem(${index})">Edit</button>
              <button class="btn btn-sm btn-danger" onclick="confirmDelete(${index})">Delete</button>
            </td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    };

    const saveItem = () => {
      const newItem = {
        partyName: partyNameSelect.value,
        address: addressInput.value,
        item: itemInput.value,
        quantity: quantityInput.value,
        rate: rateInput.value,
        discountPercentage: discountInput.value,
        gstPercentage: gstInput.value,
      };

      if (Object.values(newItem).some(value => value === '')) {
        showError('Please fill in all fields.');
        return;
      }

      hideError();

      if (editIndex !== null) {
        itemList[editIndex] = newItem;
        editIndex = null;
      } else {
        itemList.push(newItem);
      }

      updateTable();
      resetFormFields();
      bootstrap.Modal.getInstance(document.getElementById('itemModal')).hide();
    };

    const editItem = (index) => {
      const item = itemList[index];
      partyNameSelect.value = item.partyName;
      addressInput.value = item.address;
      itemInput.value = item.item;
      quantityInput.value = item.quantity;
      rateInput.value = item.rate;
      discountInput.value = item.discountPercentage;
      gstInput.value = item.gstPercentage;
      editIndex = index;
      new bootstrap.Modal(document.getElementById('itemModal')).show();
    };

    const confirmDelete = (index) => {
      deleteIndex = index;
      new bootstrap.Modal(document.getElementById('deleteModal')).show();
    };

    const deleteItem = () => {
      itemList.splice(deleteIndex, 1);
      updateTable();
      deleteIndex = null;
      bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
    };

    document.getElementById('addItemButton').addEventListener('click', () => {
      resetFormFields();
      editIndex = null;
      new bootstrap.Modal(document.getElementById('itemModal')).show();
    });

    document.getElementById('saveItemButton').addEventListener('click', saveItem);
    document.getElementById('confirmDeleteButton').addEventListener('click', deleteItem);