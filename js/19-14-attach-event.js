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
  const ulElement = document.getElementById(ulElementId);
  if (ulElement) {
    for (const todo of todoList) {
      const todoElement = createTodoElement(todo);
      ulElement.appendChild(todoElement);
    }
  }
}

// Function main
(() => {
  const todoList = [
    { id: 1, title: 'Learn JavaScript', status: 'pending' },
    { id: 2, title: 'Learn ReactJS', status: 'completed' },
    { id: 3, title: 'Learn NextJS', status: 'pending' },
  ];

  renderTodoList(todoList, 'todo-list');
})();
