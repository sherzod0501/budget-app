let elWrapper = document.querySelector(".wrapper");
let elBudgetInput = document.querySelector(".budget-input");
let elNameInput = document.querySelector(".expense-input");
let elExpenseInput = document.querySelector(".expense-input-number");
let elBudgetSpan = document.querySelector(".Budget-span");
let elExpenseSpan = document.querySelector(".Expense-span");
let elBalanceSpan = document.querySelector(".Balance-span");
let elForm = document.querySelector(".form-bottom");
let elBtn = document.querySelector(".expense-btn");
let elList = document.querySelector(".list");

let BudgetArr = [];
let ExpenseArr = [];
let ExpenseList = [];
console.log(ExpenseList);

elList.addEventListener("click", (evt) => {
  if (evt.target.matches(".delete-btn")) {
    let deleteId = Number(evt.target.dataset.deleteId);
    let FoundIndex = ExpenseList.findIndex(
      (Expense) => Expense.id === deleteId
    );
    ExpenseList.splice(FoundIndex, 1);
    elList.innerHTML = null;
    renderTodo(ExpenseList, elList);
  }
});

elWrapper.addEventListener("click", (evt) => {
  evt.preventDefault();
  let BudgetValue = elBudgetInput.value;

  BudgetArr.push(Number(BudgetValue));

  elBudgetSpan.textContent = BudgetArr.reduce((a, b) => a + b);
  elExpenseSpan.textContent = ExpenseArr.reduce((a, b) => a + b);
  elBalanceSpan.textContent =
    BudgetArr.reduce((a, b) => a + b) - ExpenseArr.reduce((a, b) => a + b);

  elBudgetInput.value = null;
});

let renderTodo = function (arr, where) {
  elList.innerHTML = null;
  arr.forEach((todo) => {
    let newItem = document.createElement("li");
    let newDiv = document.createElement("div");
    let newDelete = document.createElement("button");
    let newNumber = document.createElement("p");
    newDelete.dataset.deleteId = todo.id;

    newDelete.textContent = "Delete";
    newItem.textContent = todo.title;
    newNumber.textContent = todo.num;

    newDelete.setAttribute("class", "delete-btn btn btn-danger ms-3");
    newItem.setAttribute("class", "d-flex justify-content-between fs-3");

    newItem.append(newDiv);
    newItem.append(newDelete);
    newDiv.append(newNumber);
    where.append(newItem);
    where.className = "form-control mt-3";
  });
};

elBtn.addEventListener("click", (evt) => {
  evt.preventDefault();

  let NameValue = elNameInput.value;
  let ExpenseValue = elExpenseInput.value;

  elNameInput.value = null;
  elExpenseInput.value = null;

  let todo = {
    id: ExpenseList[ExpenseList.length - 1]?.id + 1 || 1,
    title: NameValue,
    num: ExpenseValue,
  };
  ExpenseList.push(todo);
  ExpenseArr.push(Number(todo.num));
  elList.innerHTML = null;

  renderTodo(ExpenseList, elList);
});
