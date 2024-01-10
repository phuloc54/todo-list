function isMatchStatus(todoElement, status) {
  return status.toLowerCase() === 'all' || todoElement.dataset.status === status;
}

function isMatchSearch(todoElement, searchTerm) {
  if (searchTerm === '') return true; // Optional

  const titleElement = todoElement.querySelector('p.todo__title');
  if (!titleElement) return false;
  return titleElement.textContent.toLowerCase().includes(searchTerm.toLowerCase());
}

function isMatch(todoElement, params) {
  return (
    isMatchStatus(todoElement, params.get('status')) &&
    isMatchSearch(todoElement, params.get('searchTerm'))
  );
}

// Function create todoElement
function createTodoElement(todo, params) {
  // Find template
  const todoTemplate = document.getElementById('todoTemplate');
  if (!todoTemplate) return;

  // Clone li element
  const todoElement = todoTemplate.content.firstElementChild.cloneNode(true);
  todoElement.dataset.id = todo.id;
  todoElement.dataset.status = todo.status;

  // render todo status
  const divElement = todoElement.querySelector('div.todo');
  if (!divElement) return null;
  if (divElement) {
    const isPending = todo.status === 'pending';

    const alertClass = isPending ? 'alert-secondary' : 'alert-success';

    divElement.classList.add(alertClass);

    const buttonElement = divElement.querySelector('button.mark-as-done');

    if (buttonElement) {
      const textInButton = isPending ? 'Finish' : 'Reset';

      const typeOfButton = isPending ? 'btn-dark' : 'btn-success';

      buttonElement.textContent = textInButton;

      buttonElement.classList.add(typeOfButton);
    }
  }

  // Find and update title
  const todoTitleElement = todoElement.querySelector('.todo__title');
  if (todoTitleElement) todoTitleElement.textContent = todo.title;

  // check if we should show it or not
  todoElement.hidden = !isMatch(todoElement, params);

  // TODO:Add click event on button

  // 1.Add click event on remove button
  const removeButton = todoElement.querySelector('button.remove');
  if (removeButton) {
    removeButton.addEventListener('click', () => {
      // =================== Change dataset.status in localStorage =================================
      const todoList = getTodoList();
      localStorage.setItem('todo_local', JSON.stringify(todoList.filter((x) => x.id !== todo.id)));

      // ============================================================================================

      // Remove on DOM
      todoElement.remove();
    });
  }

  // 2.Add click event on success button
  const successButton = todoElement.querySelector('button.mark-as-done');
  if (successButton) {
    successButton.addEventListener('click', () => {
      const isPending = todoElement.dataset.status === 'pending';

      const newStatus = isPending ? 'completed' : 'pending';

      // =================== Change dataset.status in localStorage ================================
      // 1. Find current todo list
      const todoList = getTodoList();
      // 2. Find element to change dataset by find index of this element
      // -> Because when we use 'index' we can change status by reference
      const index = todoList.findIndex((x) => x.id === todo.id);
      if (index >= 0) {
        todoList[index].status = newStatus;
        // Save changes on localStorage
        localStorage.setItem('todo_local', JSON.stringify(todoList));
      }

      // ============================================================================================

      const newAlertClass = isPending ? 'alert-success' : 'alert-secondary';
      // Create new type of button
      const typeOfNewButton = isPending ? 'btn-success' : 'btn-dark';

      // Change text in button from 'Finish' to 'Reset'...
      successButton.textContent = isPending ? 'Reset' : 'Finish';

      // Change dataset.status of li element ~ todoElement
      todoElement.dataset.status = newStatus;

      // Remove alert class
      divElement.classList.remove('alert-success', 'alert-secondary');

      // Change alert class in divElement
      divElement.classList.add(newAlertClass);

      // Remove class set type of button in tag button
      successButton.classList.remove('btn-dark', 'btn-success');

      // Add new class type of button
      successButton.classList.add(typeOfNewButton);
    });
  }

  // 3. Add click event on edit button
  const editButton = todoElement.querySelector('button.edit');
  if (editButton) {
    editButton.addEventListener('click', () => {
      // must get the latest todo in local storage
      const todoList = getTodoList();
      const latestTodo = todoList.find((x) => x.id === todo.id);
      if (!latestTodo) return;

      // populate data to todo form
      populateTodoForm(latestTodo);
    });
  }

  return todoElement;
}

function populateTodoForm(todo) {
  // 1. Set dataset.id for FORM: để có thể phân biệt đâu là update đâu là create
  // và có thể biết mình có thể update cho todoElement nào

  const formTodo = document.getElementById('todoFormId');
  if (!formTodo) return;
  formTodo.dataset.id = todo.id;

  // 2. Show the content of todoElement on FORM
  const inputForm = formTodo.querySelector('#todoText');
  if (inputForm) {
    inputForm.value = todo.title;
  }
}

function renderTodoList(todoList, ulElementId, params) {
  if (!Array.isArray(todoList) || todoList.length === 0) return;

  const ulElement = document.getElementById(ulElementId);
  if (ulElement) {
    for (const todo of todoList) {
      const todoElement = createTodoElement(todo, params);
      ulElement.appendChild(todoElement);
    }
  }
}

// ======================== Function to get todoList from localStorage ================================

function getTodoList() {
  try {
    return JSON.parse(localStorage.getItem('todo_local') || []);
  } catch {
    return [];
  }
}

// ====================================================================================================

// =================================== New Update on 19-18-Create-todo.js =============================
function handleTodoFormSubmit(event) {
  event.preventDefault();

  const formElement = document.getElementById('todoFormId');
  if (!formElement) return;

  // Get content on input
  const todoInput = document.getElementById('todoText');
  if (!todoInput || todoInput.value === '') return;

  // determine add or edit mode
  const isEdit = Boolean(formElement.dataset.id);

  if (isEdit) {
    // get currentTodo list
    const todoList = getTodoList();
    const index = todoList.findIndex((x) => x.id.toString() === formElement.dataset.id);
    if (index < 0) return;

    // update title to todo list
    todoList[index].title = todoInput.value;

    // save changes to local storage
    localStorage.setItem('todo_local', JSON.stringify(todoList));

    // apply changes on DOM
    const liElement = document.querySelector(
      `ul#todo-list > li[data-id="${formElement.dataset.id}"]`,
    );

    if (!liElement) return;
    const todoTitleElement = liElement.querySelector('.todo__title');
    if (todoTitleElement) todoTitleElement.textContent = todoInput.value;
  } else {
    //add new todoElement
    const newTodo = {
      id: Date.now(),
      title: todoInput.value,
      status: 'pending',
    };

    // Save changes on local storage
    const todoList = getTodoList();
    todoList.push(newTodo);
    localStorage.setItem('todo_local', JSON.stringify(todoList));

    // apply DOM changes
    const ulElement = document.getElementById('todo-list');
    if (!ulElement) return;
    ulElement.appendChild(createTodoElement(newTodo));
  }

  // Reset form
  delete formElement.dataset.id;
  if (formElement) {
    formElement.reset();
  }
}

// ====================================================================================================

// Function main
(() => {
  // localStorage.setItem(
  //   'todo_local',
  //   JSON.stringify([
  //     { id: 1, title: 'Learn JavaScript', status: 'pending' },
  //     { id: 2, title: 'Learn ReactJS', status: 'completed' },
  //     { id: 3, title: 'Learn NextJS', status: 'pending' },
  //   ]),
  // );

  // const todoList = JSON.parse(localStorage.getItem('todo_local'));
  const params = new URLSearchParams(window.location.search);

  const todoList = getTodoList();

  renderTodoList(todoList, 'todo-list', params);

  // register submit event for todo form
  const todoForm = document.getElementById('todoFormId');
  if (todoForm) {
    todoForm.addEventListener('submit', handleTodoFormSubmit);
  }
})();
