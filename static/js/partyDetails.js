let partyList = [];
let editIndex = null;
let deleteIndex = null;

document.getElementById("addPartyBtn").addEventListener("click", () => {
  document.getElementById("partyForm").reset();
  editIndex = null;
  document.getElementById("editIndex").value = "";
  const modal = new bootstrap.Modal(document.getElementById("partyModal"));
  modal.show();
});

document.getElementById("savePartyBtn").addEventListener("click", () => {
  const partyDetails = {
    party_type: document.getElementById("partyType").value,
    party_name: document.getElementById("partyName").value,
    gst_number: document.getElementById("gstNumber").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    description: document.getElementById("description").value,
  };

  if (editIndex !== null) {
    partyList[editIndex] = partyDetails;
  } else {
    partyList.push(partyDetails);
  }

  updatePartyList();
  const modal = bootstrap.Modal.getInstance(document.getElementById("partyModal"));
  modal.hide();
});

document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
  partyList.splice(deleteIndex, 1);
  updatePartyList();
  const modal = bootstrap.Modal.getInstance(document.getElementById("deleteModal"));
  modal.hide();
});

function updatePartyList() {
  const partyListTable = document.getElementById("partyList");
  partyListTable.innerHTML = "";

  partyList.forEach((party, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${party.party_name}</td>
      <td>${party.gst_number}</td>
      <td>${party.party_type}</td>
      <td>${party.phone}</td>
      <td>${party.email}</td>
      <td>${party.address}</td>
      <td>${party.description}</td>
      <td>
        <button class="btn btn-primary btn-sm me-2" onclick="editParty(${index})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteParty(${index})">Delete</button>
      </td>
    `;
    partyListTable.appendChild(row);
  });
}

function editParty(index) {
  const party = partyList[index];
  document.getElementById("partyType").value = party.party_type;
  document.getElementById("partyName").value = party.party_name;
  document.getElementById("gstNumber").value = party.gst_number;
  document.getElementById("phone").value = party.phone;
  document.getElementById("email").value = party.email;
  document.getElementById("address").value = party.address;
  document.getElementById("description").value = party.description;
  editIndex = index;

  const modal = new bootstrap.Modal(document.getElementById("partyModal"));
  modal.show();
}

function deleteParty(index) {
  deleteIndex = index;
  const modal = new bootstrap.Modal(document.getElementById("deleteModal"));
  modal.show();
}
