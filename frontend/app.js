const STORAGE_KEY = 'chantierCiment';
let cementUsage = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const form = document.getElementById('cementForm');
const tbody = document.getElementById('tableBody');
const totalDisplay = document.getElementById('totalDisplay');

function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cementUsage));
}

function render() {
    tbody.innerHTML = '';
    let total = 0;

    cementUsage.forEach((item, index) => {
        total += item.quantity;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.date}</td>
            <td>${item.quantity}</td>
            <td>${item.type}</td>
            <td>${item.supplier || '-'}</td>
            <td>${item.comment || '-'}</td>
            <td>
                <button data-index="${index}">Supprimer</button>
            </td>
        `;

        tr.querySelector('button').addEventListener('click', () => {
            cementUsage.splice(index, 1);
            save();
            render();
        });

        tbody.appendChild(tr);
    });

    totalDisplay.textContent = `Total sacs utilisés : ${total.toFixed(1)}`;
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const entry = {
        date: date.value,
        quantity: Number(quantity.value),
        type: type.value,
        supplier: supplier.value.trim(),
        comment: comment.value.trim()
    };

    if (!entry.date || entry.quantity <= 0) return;

    cementUsage.push(entry);
    save();
    render();
    form.reset();
});

window.addEventListener('DOMContentLoaded', render);
