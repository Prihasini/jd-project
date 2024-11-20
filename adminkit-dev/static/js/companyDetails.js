document.addEventListener('DOMContentLoaded', () => {
    const openDialogButton = document.getElementById('open-dialog');
    const closeDialogButton = document.getElementById('close-dialog');
    const dialog = document.getElementById('dialog');
    const companyForm = document.getElementById('company-form');
    const companyList = document.getElementById('company-list');
    let editIndex = null;

    function openDialog() {
        dialog.classList.add('open');
        if (editIndex === null) {
            companyForm.reset();
        }
    }

    function closeDialog() {
        dialog.classList.remove('open');
    }

    function renderCompanies() {
        companyList.innerHTML = '';
        const companies = JSON.parse(localStorage.getItem('companies') || '[]');
        companies.forEach((company, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${company.name}</td>
                <td>${company.gst}</td>
                <td>${company.pan}</td>
                <td>${company.phone || ''}</td>
                <td>${company.email || ''}</td>
                <td>${company.address || ''}</td>
                <td>
                    <button class="mui-btn mui-btn--icon mui-btn--small" onclick="editCompany(${index})"><span class="material-icons">edit</span></button>
                    <button class="mui-btn mui-btn--icon mui-btn--small mui-btn--danger" onclick="deleteCompany(${index})"><span class="material-icons">delete</span></button>
                </td>
            `;
            companyList.appendChild(row);
        });
    }

    openDialogButton.addEventListener('click', () => {
        editIndex = null;
        openDialog();
    });

    closeDialogButton.addEventListener('click', closeDialog);

    companyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const companyData = {
            name: document.getElementById('company-name').value,
            gst: document.getElementById('gst').value,
            pan: document.getElementById('pan').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
        };
        const companies = JSON.parse(localStorage.getItem('companies') || '[]');

        if (editIndex !== null) {
            companies[editIndex] = companyData;
        } else {
            companies.push(companyData);
        }

        localStorage.setItem('companies', JSON.stringify(companies));
        renderCompanies();
        closeDialog();
    });

    window.editCompany = function(index) {
        const companies = JSON.parse(localStorage.getItem('companies') || '[]');
        const company = companies[index];
        document.getElementById('company-name').value = company.name;
        document.getElementById('gst').value = company.gst;
        document.getElementById('pan').value = company.pan;
        document.getElementById('phone').value = company.phone;
        document.getElementById('email').value = company.email;
        document.getElementById('address').value = company.address;
        editIndex = index;
        openDialog();
    }

    window.deleteCompany = function(index) {
        const companies = JSON.parse(localStorage.getItem('companies') || '[]');
        companies.splice(index, 1);
        localStorage.setItem('companies', JSON.stringify(companies));
        renderCompanies();
    }

    renderCompanies();
});
