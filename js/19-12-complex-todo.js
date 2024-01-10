// Function create todoElement
function createTodoElement(todo) {
  const todoTemplate = document.getElementById('todoTemplate');
  if (!todoTemplate) return;

  // Clone li element
  const todoElement = todoTemplate.content.firstElementChild.cloneNode(true);

  // Find and update title
  const todoTitleElement = todoElement.querySelector('.todo__title');
  if (todoTitleElement) todoTitleElement.textContent = todo.title;

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
    { id: 1, title: 'Learn JavaScript' },
    { id: 2, title: 'Learn ReactJS' },
    { id: 3, title: 'Learn NextJS' },
  ];

  renderTodoList(todoList, 'todo-list');
})();
