const state = {
  newTask: '',
  tasks: [
    {
      id: 0,
      name: "Изучить что такое фреймворки"
    }
  ]
};

const todoListEl = document.querySelector("#todo-list");

function renderTodoList() {
  const frag = document.createDocumentFragment();

  state.tasks.forEach((task) => {
    const item = buildTodoItemEl(task.id, task.name);
    frag.appendChild(item);
  });

  while (todoListEl.lastChild) {
    todoListEl.removeChild(todoListEl.lastChild)
  }
  todoListEl.appendChild(frag);
}

const inputEl = document.querySelector("#input");

function renderInput() {
  inputEl.value = state.newTask;
}

function createTask(name) {
  return {
    name,
    id: generateId(state)
  };
}

const buttonEl = document.querySelector("#button");

function buildTodoItemEl(id, name) {
  const item = document.createElement("li");
  const span = document.createElement("span");

  span.textContent = name

  item.id = id;
  item.appendChild(span);
  item.appendChild(buildDeleteButtonEl(id));

  return item;
}

function buildDeleteButtonEl(id) {
  const button = document.createElement("button");

  button.setAttribute("type", "button");
  button.addEventListener("click", handleTodoDeleteButtonClick.bind(null, id));
  button.textContent = "Удалить";

  return button;
}

function handleTodoDeleteButtonClick(id) {
  state.tasks = state.tasks.filter((t) => t.id !== id);
  renderTodoList();
}

function handleInputChange(e) {
  state.newTask = e.target.value;
}

function handleFormSubmit(e) {
  e.preventDefault();
  state.tasks = [...state.tasks, createTask(state.newTask)];
  state.newTask = "";
  renderInput();
  renderTodoList();
}

function generateId(s) {
  const ids = s.tasks.map(({ id }) => id) || []
  const generatedId = Math.floor(Math.random() * Date.now());
  return ids.includes(generatedId) ? generateId(s) : generatedId;
}

function init() {
  inputEl.addEventListener("change", handleInputChange);
  buttonEl.addEventListener("click", handleFormSubmit);
  renderInput();
  renderTodoList();
}

document.addEventListener("DOMContentLoaded", init);