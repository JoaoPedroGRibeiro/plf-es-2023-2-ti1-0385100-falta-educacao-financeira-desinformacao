document.addEventListener("DOMContentLoaded", function () {
    const expenseInput = document.getElementById("expense-input");
    const amountInput = document.getElementById("amount-input");
    const categoryInput = document.getElementById("category-input");
    const addExpenseButton = document.getElementById("add-expense");
    const expenseList = document.getElementById("expense-list");
    const totalExpenses = document.getElementById("total-expenses");
    const initialMoneyInput = document.getElementById("initial-money");
    const updateButton = document.getElementById("update-money");
    const totalMoney = document.getElementById("total-money");
    const expenseChart = document.getElementById("expense-chart").getContext("2d");
    const filterCategory = document.getElementById("filter-category");
    const filterSorting = document.getElementById("filter-sorting");

    const expenseCategoryData = {};

    let expenses = [];
    let money = 0;
    let expenseLabels = [];
    let expenseData = [];

    



    updateButton.addEventListener("click", function () {
        const initialMoney = parseFloat(initialMoneyInput.value);
        if (!isNaN(initialMoney)) {
            money = initialMoney;
            totalMoney.innerText = `Saldo: R$ ${money.toFixed(2)}`;
        }
    });

    addExpenseButton.addEventListener("click", function () {
        const expenseName = expenseInput.value;
        const expenseAmount = parseFloat(amountInput.value);
        const expenseCategory = categoryInput.value;

        if (expenseName && !isNaN(expenseAmount)) {
            const expense = {
                name: expenseName,
                amount: expenseAmount,
                category: expenseCategory,
            };

            if (expenseCategory in expenseCategoryData) {
                expenseCategoryData[expenseCategory] += expenseAmount;
            } else {
                expenseCategoryData[expenseCategory] = expenseAmount;
            }

            expenses.push(expense);
            expenseLabels.push(expense.name);
            expenseData.push(expense.amount);
            updateExpenses();
            clearInputs();
            money -= expenseAmount;
            totalMoney.innerText = `Saldo: R$ ${money.toFixed(2)}`;
        }
    });


    filterCategory.addEventListener("change", updateExpenses);
    filterSorting.addEventListener("change", updateExpenses);

    function updateExpenses() {
        expenseList.innerHTML = "";
        total = 0;

        const selectedCategory = filterCategory.value;
        const sortingOption = filterSorting.value;

        let filteredExpenses = expenses.slice();

        if (selectedCategory !== "Todas") {
            filteredExpenses = filteredExpenses.filter(expense => expense.category === selectedCategory);
        }

        if (sortingOption === "Valor Crescente") {
            filteredExpenses.sort((a, b) => a.amount - b.amount);
        } else if (sortingOption === "Valor Decrescente") {
            filteredExpenses.sort((a, b) => b.amount - a.amount);
        }

        filteredExpenses.forEach((expense, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span>${expense.name} (Categoria: ${expense.category})</span>
                <span>R$ ${expense.amount.toFixed(2)}</span>
                <button onclick="deleteExpense(${index})">Excluir</button>
            `;
            expenseList.appendChild(listItem);

            total += expense.amount;
        });

        totalExpenses.innerText = `Total Despesas: R$ ${total.toFixed(2)}`;
        chart.update();
    }

    function clearInputs() {
        expenseInput.value = "";
        amountInput.value = "";
        categoryInput.value = "Alimentação";
    }

    window.deleteExpense = function (index) {
        if (index >= 0 && index < expenses.length) {
            const deletedExpense = expenses[index];
            if (deletedExpense.category in expenseCategoryData) {
                expenseCategoryData[deletedExpense.category] -= deletedExpense.amount;
            }
            expenses.splice(index, 1);
            expenseLabels.splice(index, 1);
            expenseData.splice(index, 1);

            totalMoney.innerText = `Saldo: R$ ${money.toFixed(2)}`;
        }
    };
});