const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalDisplay = document.getElementById('total');
let expenses = [];

expenseForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;

  if (!description || isNaN(amount)) return;
 
  const expense = {
    id: Date.now(),
    description,
    amount,
    category
  };
  expenses.push(expense);
  addExpenseToList(expense);
  updateTotal();
  expenseForm.reset();
});

function addExpenseToList(expense) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${expense.description} - $${expense.amount.toFixed(2)} [${expense.category}]</span>
    <button onclick="deleteExpense(${expense.id})">Delete</button>
  `;
  li.id = `expense-${expense.id}`;
  expenseList.appendChild(li);
}

function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  const li = document.getElementById(`expense-${id}`);
  if (li) li.remove();
  updateTotal();
}

function updateTotal() {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  totalDisplay.textContent = total.toFixed(2);
}
 