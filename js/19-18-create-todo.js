// Function create todoElement
function createTodoElement(todo) {
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

  // TODO: Attack event on button

  // 1. attack event on remove button
  const removeButton = todoElement.querySelector('button.remove');
  if (removeButton) {
    removeButton.addEventListener('click', () => {
      // =================== Change dataset.status in localStorage =================================
      const todoList = getTodoList();
      console.log({ todoList, removeId: todo.id });
      localStorage.setItem('todo_local', JSON.stringify(todoList.filter((x) => x.id !== todo.id)));

      // ============================================================================================

      // Remove on DOM
      todoElement.remove();
    });
  }

  // 2. attack event on success button
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

  return todoElement;
}

// Function create todo list
function renderTodoList(todoList, ulElementId) {
  if (!Array.isArray(todoList) || todoList.length === 0) return;

  const ulElement = document.getElementById(ulElementId);
  if (ulElement) {
    for (const todo of todoList) {
      const todoElement = createTodoElement(todo);
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
  console.log('form submit click');
  // Get content on input
  const todoInput = document.getElementById('todoText');
  const content = todoInput.value;

  if (content === '') return;

  //Create new todoElement
  const newTodo = {
    id: Date.now(),
    title: content,
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

  // Reset form
  const formElement = document.getElementById('todoFormId');
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

  const todoList = getTodoList();
  renderTodoList(todoList, 'todo-list');

  // register submit event for todo form
  const todoForm = document.getElementById('todoFormId');
  if (todoForm) {
    todoForm.addEventListener('submit', handleTodoFormSubmit);
  }
})();
