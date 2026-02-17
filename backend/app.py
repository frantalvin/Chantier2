const API = "https://cement-api.onrender.com/cement";

const form = document.getElementById("cementForm");
const tbody = document.getElementById("tableBody");
const totalDisplay = document.getElementById("totalDisplay");

function loadData() {
    fetch(API)
        .then(r => r.json())
        .then(data => render(data));
}

function render(data) {
    tbody.innerHTML = "";
    let total = 0;

    data.forEach(item => {
        total += item.quantity;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.date}</td>
            <td>${item.quantity}</td>
            <td>${item.type}</td>
            <td>${item.supplier || "-"}</td>
            <td>${item.comment || "-"}</td>
            <td>
                <button onclick="deleteItem(${item.id})">Supprimer</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    totalDisplay.textContent = `Total sacs utilisés : ${total.toFixed(1)}`;
}

function deleteItem(id) {
    fetch(`${API}/${id}`, { method: "DELETE" })
        .then(() => loadData());
}

form.addEventListener("submit", e => {
    e.preventDefault();

    const data = {
        date: date.value,
        quantity: Number(quantity.value),
        type: type.value,
        supplier: supplier.value,
        comment: comment.value
    };

    fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(() => {
        form.reset();
        loadData();
    });
});

loadData();
