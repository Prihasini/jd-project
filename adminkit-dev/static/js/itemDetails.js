const apiBaseURL = "https://your-api-url.com"; // Replace with your API URL
let items = [];
let categories = [];
let editIndex = null;

const fetchItems = async () => {
  try {
    const response = await fetch(`${apiBaseURL}/api/user/items/`);
    const data = await response.json();
    items = data.data;
    renderTable();
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};

const fetchCategories = async () => {
  try {
    const response = await fetch(`${apiBaseURL}/api/user/categories/minimal/`);
    const data = await response.json();
    categories = data.data;
    renderCategories();
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const renderCategories = () => {
  const categorySelect = document.getElementById("categoryItem");
  categorySelect.innerHTML = categories
    .map(category => `<option value="${category.category_name}">${category.category_name}</option>`)
    .join("");
};

const renderTable = () => {
  const tableBody = document.getElementById("itemTableBody");
  tableBody.innerHTML = items
    .map(
      (item, index) => `
        <tr>
          <td>${item.item_name}</td>
          <td>${item.item_code}</td>
          <td>${item.category_item}</td>
          <td>${item.hsn_code}</td>
          <td>${item.unit_price}</td>
          <td>${item.stock_quantity}</td>
          <td>${item.description}</td>
          <td>
            <button class="btn btn-warning btn-sm" onclick="handleEdit(${index})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="handleDelete(${index})">Delete</button>
          </td>
        </tr>
      `
    )
    .join("");
};

const handleOpen = () => {
  editIndex = null;
  document.getElementById("itemModalTitle").innerText = "Add Item Details";
  document.getElementById("itemForm").reset();
  new bootstrap.Modal(document.getElementById("itemModal")).show();
};

const handleEdit = index => {
  editIndex = index;
  const item = items[index];
  document.getElementById("itemModalTitle").innerText = "Edit Item Details";
  Object.keys(item).forEach(key => {
    const field = document.getElementById(key);
    if (field) field.value = item[key];
  });
  new bootstrap.Modal(document.getElementById("itemModal")).show();
};

const handleAddOrUpdate = async () => {
  const form = document.getElementById("itemForm");
  const formData = new FormData(form);
  const itemDetails = Object.fromEntries(formData.entries());

  try {
    if (editIndex !== null) {
      await fetch(`${apiBaseURL}/api/user/items/${itemDetails.item_code}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemDetails),
      });
      items[editIndex] = itemDetails;
    } else {
      const response = await fetch(`${apiBaseURL}/api/user/items/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemDetails),
      });
      const newItem = await response.json();
      items.push(newItem.data);
    }
    renderTable();
    bootstrap.Modal.getInstance(document.getElementById("itemModal")).hide();
  } catch (error) {
    console.error("Error saving item:", error);
  }
};

const handleDelete = async index => {
  const item = items[index];
  try {
    await fetch(`${apiBaseURL}/api/user/items/${item.item_code}/`, {
      method: "DELETE",
    });
    items.splice(index, 1);
    renderTable();
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

// Initialize
fetchItems();
fetchCategories();
