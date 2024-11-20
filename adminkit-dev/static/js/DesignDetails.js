let designList = [];
    let editIndex = null;

    function resetForm() {
      document.getElementById("designForm").reset();
      editIndex = null;
      document.getElementById("designModalLabel").textContent = "Add Design";
    }

    function openModal() {
      resetForm();
      const modal = new bootstrap.Modal(document.getElementById("designModal"));
      modal.show();
    }

    function handleAddOrUpdate() {
      const designName = document.getElementById("designName").value.trim();
      const designCode = document.getElementById("designCode").value.trim();
      const associatedItems = Array.from(document.getElementById("associatedItems").selectedOptions).map(option => option.value);
      const description = document.getElementById("description").value.trim();

      if (!designName || !designCode) {
        alert("Please fill in all required fields!");
        return;
      }

      const newDesign = { design_name: designName, design_code: designCode, associated_items: associatedItems, description };

      if (editIndex !== null) {
        designList[editIndex] = newDesign;
      } else {
        designList.push(newDesign);
      }

      renderTable();
      const modal = bootstrap.Modal.getInstance(document.getElementById("designModal"));
      modal.hide();
    }

    function renderTable() {
      const tableBody = document.getElementById("designTableBody");
      tableBody.innerHTML = "";

      designList.forEach((design, index) => {
        const row = `<tr>
          <td>${design.design_name}</td>
          <td>${design.design_code}</td>
          <td>${design.associated_items.join(", ")}</td>
          <td>${design.description}</td>
          <td>
            <button class="btn btn-warning btn-sm" onclick="editDesign(${index})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteDesign(${index})">Delete</button>
          </td>
        </tr>`;
        tableBody.insertAdjacentHTML("beforeend", row);
      });
    }

    function editDesign(index) {
      const design = designList[index];
      document.getElementById("designName").value = design.design_name;
      document.getElementById("designCode").value = design.design_code;
      document.getElementById("associatedItems").value = design.associated_items;
      document.getElementById("description").value = design.description;

      editIndex = index;
      document.getElementById("designModalLabel").textContent = "Edit Design";
      const modal = new bootstrap.Modal(document.getElementById("designModal"));
      modal.show();
    }

    function deleteDesign(index) {
      if (confirm("Are you sure you want to delete this design?")) {
        designList.splice(index, 1);
        renderTable();
      }
    }

    document.addEventListener("DOMContentLoaded", () => {
      renderTable();
    });