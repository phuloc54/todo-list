function getAllTodoElements() {
  return document.querySelectorAll('ul#todo-list > li');
}

function isMatch(todoElement, searchTerm) {
  if (!todoElement) return false;
  if (searchTerm === '') return true; // Optional

  const titleElement = todoElement.querySelector('p.todo__title');
  if (!titleElement) return false;
  return titleElement.textContent.toLowerCase().includes(searchTerm.toLowerCase());
}

function searchTodo(searchTerm) {
  const todoElementList = getAllTodoElements();
  for (const todoElement of todoElementList) {
    const needToShow = isMatch(todoElement, searchTerm);
    todoElement.hidden = !needToShow;
  }
}

function initSearchInput() {
  const searchInput = document.getElementById('searchTerm');
  if (!searchInput) return;

  searchInput.addEventListener('input', () => {
    searchTodo(searchInput.value);
  });
}

function filterTodo(status) {
  const todoElementList = getAllTodoElements();

  for (const todoElement of todoElementList) {
    const needToShow = status.toLowerCase() === 'all' || todoElement.dataset.status === status;
    todoElement.hidden = !needToShow;
  }
}

function initFilterStatus() {
  const filterStatusSelect = document.getElementById('filterStatus');
  if (!filterStatusSelect) return;

  filterStatusSelect.addEventListener('change', () => {
    console.log(filterStatusSelect.value);
    filterTodo(filterStatusSelect.value);
  });
}

// main
(() => {
  initSearchInput();
  initFilterStatus();
})();
