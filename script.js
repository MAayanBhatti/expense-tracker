let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function saveToStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function calculateSummary() {
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((a, b) => a + b, 0).toFixed(2);
  const income = amounts.filter(v => v > 0).reduce((a, b) => a + b, 0).toFixed(2);
  const expense = Math.abs(amounts.filter(v => v < 0).reduce((a, b) => a + b, 0)).toFixed(2);

  document.getElementById("balance").textContent = `$${total}`;
  document.getElementById("income").textContent = `$${income}`;
  document.getElementById("expense").textContent = `$${expense}`;
}

function renderTransactions() {
  const list = document.getElementById("transaction-list");
  list.innerHTML = '';

  transactions.forEach((t, index) => {
    const li = document.createElement("li");
    li.className = `flex justify-between items-center bg-gray-50 border-l-4 ${t.amount < 0 ? 'border-red-500' : 'border-green-500'} p-2 rounded-md shadow-sm`;

    li.innerHTML = `
      <div class="flex flex-col">
        <span class="text-gray-800 font-medium">${t.description}</span>
        <small class="text-gray-400">${t.date}</small>
      </div>
      <div class="flex items-center gap-3">
        <span class="${t.amount < 0 ? 'text-red-600' : 'text-green-600'} font-semibold">$${Math.abs(t.amount).toFixed(2)}</span>
        <button onclick="deleteTransaction(${index})" class="text-red-500 hover:text-red-700 font-bold text-xl">&times;</button>
      </div>
    `;

    list.appendChild(li);
  });

  calculateSummary();
}

function addTransaction() {
  const descInput = document.getElementById("desc");
  const amountInput = document.getElementById("amount");
  const typeSelect = document.getElementById("type");

  const description = descInput.value.trim();
  let amount = parseFloat(amountInput.value);
  const type = typeSelect.value;

  if (!description || isNaN(amount)) {
    alert("Please enter a valid description and amount.");
    descInput.focus();
    return;
  }

  // Convert to negative if expense
  if (type === "expense") amount = -Math.abs(amount);
  else amount = Math.abs(amount);

  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  transactions.push({
    description,
    amount,
    date: formattedDate
  });

  descInput.value = '';
  amountInput.value = '';
  saveToStorage();
  renderTransactions();
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  saveToStorage();
  renderTransactions();
}

document.getElementById("add").addEven

window.onload = function () {
  document.getElementById("add").addEventListener("click", addTransaction);
  renderTransactions();
};

