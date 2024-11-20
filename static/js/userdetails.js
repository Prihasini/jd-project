let userList = [];
let editIndex = null;

// DOM Elements
const addUserBtn = document.getElementById("addUserBtn");
const userModal = new bootstrap.Modal(document.getElementById("userModal"));
const confirmModal = new bootstrap.Modal(document.getElementById("confirmModal"));
const userTableBody = document.getElementById("userTableBody");
const saveUserBtn = document.getElementById("saveUserBtn");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

const userNameInput = document.getElementById("userName");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const contactNumberInput = document.getElementById("contactNumber");
const roleInput = document.getElementById("role");
const descriptionInput = document.getElementById("description");

// Add User Button Click
addUserBtn.addEventListener("click", () => {
  resetForm();
  editIndex = null;
  document.getElementById("userModalLabel").textContent = "Add User";
  userModal.show();
});

// Save User
saveUserBtn.addEventListener("click", () => {
  const user = {
    userName: userNameInput.value,
    fullName: fullNameInput.value,
    email: emailInput.value,
    contactNumber: contactNumberInput.value,
    role: roleInput.value,
    description: descriptionInput.value,
  };

  if (editIndex !== null) {
    userList[editIndex] = user;
  } else {
    userList.push(user);
  }
  updateUserTable();
  userModal.hide();
});

// Delete Confirmation
confirmDeleteBtn.addEventListener("click", () => {
  userList.splice(editIndex, 1);
  updateUserTable();
  confirmModal.hide();
});

// Update User Table
function updateUserTable() {
  userTableBody.innerHTML = userList
    .map(
      (user, index) => `
    <tr>
      <td>${user.userName}</td>
      <td>${user.fullName}</td>
      <td>${user.email}</td>
      <td>${user.contactNumber}</td>
      <td>${user.role}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editUser(${index})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="confirmDelete(${index})">Delete</button>
      </td>
    </tr>
  `
    )
    .join("");
}

// Edit User
function editUser(index) {
  editIndex = index;
  const user = userList[index];
  userNameInput.value = user.userName;
  fullNameInput.value = user.fullName;
  emailInput.value = user.email;
  contactNumberInput.value = user.contactNumber;
  roleInput.value = user.role;
  descriptionInput.value = user.description;
  document.getElementById("userModalLabel").textContent = "Edit User";
  userModal.show();
}

// Confirm Delete
function confirmDelete(index) {
  editIndex = index;
  confirmModal.show();
}

// Reset Form
function resetForm() {
  userNameInput.value = "";
  fullNameInput.value = "";
  emailInput.value = "";
  contactNumberInput.value = "";
  roleInput.value = "";
  descriptionInput.value = "";
}
