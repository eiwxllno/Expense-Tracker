// Get references to elements
const expenseForm = document.getElementById("expense-form");
const expenseInput = document.getElementById("expense-description");
const amountInput = document.getElementById("expense-amount");
const categoryInput = document.getElementById("expense-category");
const transactionList = document
  .getElementById("transaction-history")
  .getElementsByTagName("tbody")[0];
const totalExpense = document.getElementById("total-expenses");
const totalIncome = document.getElementById("total-income");
const balance = document.getElementById("balance");

// Add expense functionality
expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const description = expenseInput.value.trim();
  const amount = parseFloat(amountInput.value.trim());
  const category = categoryInput.value;

  if (description === "" || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid expense description and amount.");
    return;
  }

  addTransaction(description, amount, category, "Expense");
  updateSummary();
  clearInputs();
});

// Add income functionality
const addIncomeButton = document.getElementById("add-income-button");
addIncomeButton.addEventListener("click", function () {
  const description = document
    .getElementById("income-description")
    .value.trim();
  const amount = parseFloat(
    document.getElementById("income-amount").value.trim()
  );

  if (description === "" || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid income description and amount.");
    return;
  }

  addTransaction(description, amount, "--", "Income");
  updateSummary();
  document.getElementById("income-description").value = "";
  document.getElementById("income-amount").value = "";
});

// Add transaction to the table
function addTransaction(description, amount, category, type) {
  const transactionRow = document.createElement("tr");

  transactionRow.innerHTML = `
    <td>${description}</td>
    <td>${category}</td>
    <td>${amount.toFixed(2)}</td>
    <td>${type}</td>
    <td><button class="delete-btn">Delete</button></td>
  `;

  transactionList.appendChild(transactionRow);

  transactionRow
    .querySelector(".delete-btn")
    .addEventListener("click", function () {
      transactionRow.remove();
      updateSummary();
    });
}

// Update the summary values
function updateSummary() {
  let totalExpenses = 0;
  let totalIncomes = 0;

  const transactions = transactionList.querySelectorAll("tr");

  transactions.forEach(function (transaction) {
    const amount = parseFloat(transaction.children[2].textContent);
    const type = transaction.children[3].textContent;

    if (type === "Income") {
      totalIncomes += amount;
    } else {
      totalExpenses += amount;
    }
  });

  totalExpense.textContent = totalExpenses.toFixed(2);
  totalIncome.textContent = totalIncomes.toFixed(2);
  balance.textContent = (totalIncomes - totalExpenses).toFixed(2);
}

// Clear all transactions
const clearAllButton = document.getElementById("clear-all");
clearAllButton.addEventListener("click", function () {
  transactionList.innerHTML = "";
  updateSummary();
});

// Clear input fields after submission
function clearInputs() {
  expenseInput.value = "";
  amountInput.value = "";
  categoryInput.value = "Housing"; // Reset to default category
}
