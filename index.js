const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');
const balanceDisplay = document.getElementById('balance');
let balance = 0;
let expenses = [];

//function to update balance 
function updateBalance(){
    balance = expenses.reduce((total,expense)=> total + expense.amount,0);
    balanceDisplay.textContent = balance;
}

//function to render expense list 
function renderExpenses(){
    expenseList.innerHTML = ''; // Clear the table before re-rendering
    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${expense.description}</td>
            <td>${expense.category}</td>
            <td>₹${expense.amount}</td>
            <td class="action-buttons">
                <button onclick="editExpense(${index})">Edit</button>
                <button onclick="deleteExpense(${index})">Delete</button>
            </td>`;
        expenseList.appendChild(row);
    });
    updateBalance();
}
expenseForm.addEventListener('submit',function(event){
    event.preventDefault();

    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);
    
    if (expenseForm.dataset.editing !== undefined) {
        // Update existing expense
        const index = parseInt(expenseForm.dataset.editing, 10);
        expenses[index] = { description, category, amount };
        delete expenseForm.dataset.editing;
        expenseForm.querySelector('input[type="submit"]').value = 'Add Expense';
    } else {
        // Add new expense
        expenses.push({ description, category, amount });
    }

    expenseForm.reset();
    renderExpenses();
 
});

//function to delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    renderExpenses();
}

//function to edit an expense
function editExpense(index) {
    const expense = expenses[index];
    document.getElementById('description').value = expense.description;
    document.getElementById('category').value = expense.category;
    document.getElementById('amount').value = expense.amount;

    expenseForm.dataset.editing = index;
    expenseForm.querySelector('input[type="submit"]').value = 'Update Expense';
}