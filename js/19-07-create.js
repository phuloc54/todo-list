function createTodoElement(todo) {
  if (!todo) return null;

  const liElement = document.createElement('li');
  liElement.textContent = todo.title;
  liElement.dataset.id = todo.id;

  return liElement;
}

function renderTodoList(todoList, ulElementId) {
  // Check parameter
  if (!Array.isArray(todoList) || todoList.length === 0) return;

  // 1. Find ul element
  const ulElement = document.getElementById(ulElementId);
  if (!ulElement) return;

  // 2. Loop through todoList
  for (const todo of todoList) {
    const liElement = createTodoElement(todo);
    ulElement.appendChild(liElement);
  }
}

(() => {
  const todoList1 = [
    { id: 1, title: 'Learn JavaScript' },
    { id: 2, title: 'Learn ReactJS' },
    { id: 3, title: 'Learn NextJS' },
  ];

  renderTodoList(todoList1, 'todo-list-1');

  const todoList2 = [
    { id: 1, title: 'Learn C' },
    { id: 2, title: 'Learn Java' },
    { id: 3, title: 'Learn C#' },
    { id: 3, title: 'Learn GoLang' },
  ];

  renderTodoList(todoList2, 'todo-list-2');
})();
