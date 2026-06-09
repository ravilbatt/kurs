let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let budget = localStorage.getItem("budget") || 0;
document.getElementById("budgetValue").innerText = budget;
showExpenses();
updateInfo();
function saveBudget() {
    budget = document.getElementById("budget").value;
    localStorage.setItem("budget", budget);
    document.getElementById("budgetValue").innerText = budget;
    updateInfo();
}
function addExpense() {
    let date = document.getElementById("date").value;
    let category = document.getElementById("category").value;
    let amount = document.getElementById("amount").value;
    if (date === "" || category === "" || amount === "") {
        alert("Заполните все поля");
        return;
    }
    let expense = {
        date: date,
        category: category,
        amount: Number(amount)
    };
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    showExpenses();
    updateInfo();
    document.getElementById("date").value = "";
    document.getElementById("category").value = "";
    document.getElementById("amount").value = "";
}
function showExpenses() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    for (let i = 0; i < expenses.length; i++) {
        list.innerHTML += `
            <tr>
                <td>${expenses[i].date}</td>
                <td>${expenses[i].category}</td>
                <td>${expenses[i].amount}</td>
                <td><button onclick="deleteExpense(${i})">X</button></td>
            </tr>
        `;
    }
}
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    showExpenses();
    updateInfo();
}
function updateInfo() {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }
    document.getElementById("totalExpense").innerText = total;
    document.getElementById("rest").innerText = budget - total;
    if (total > budget && budget != 0) {
        document.getElementById("warning").innerText = "Бюджет превышен!";
    } else {
        document.getElementById("warning").innerText = "";
    }
}