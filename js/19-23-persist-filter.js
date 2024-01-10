function getAllTodoElements() {
  return document.querySelectorAll('ul#todo-list > li');
}

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

function handleFilterChange(filterName, filterValue) {
  // Update query params
  const url = new URL(window.location);
  url.searchParams.set(filterName, filterValue);
  history.pushState({}, '', url);

  const todoElementList = getAllTodoElements();
  for (const todoElement of todoElementList) {
    const needToShow = isMatch(todoElement, url.searchParams);
    todoElement.hidden = !needToShow;
  }
}

function initSearchInput(params) {
  const searchInput = document.getElementById('searchTerm');
  if (!searchInput) return;

  // If params has value of 'parameter: 'searchTerm'
  if (params.get('searchTerm')) {
    searchInput.value = params.get('searchTerm');
  }

  searchInput.addEventListener('input', () => {
    handleFilterChange('searchTerm', searchInput.value);
  });
}

function initFilterStatus(params) {
  const filterStatusSelect = document.getElementById('filterStatus');
  if (!filterStatusSelect) return;

  if (params.get('status')) {
    filterStatusSelect.value = params.get('status');
  }

  filterStatusSelect.addEventListener('change', () => {
    handleFilterChange('status', filterStatusSelect.value);
  });
}

// main
(() => {
  // get query params object
  const params = new URLSearchParams(window.location.search);

  initSearchInput(params);
  initFilterStatus(params);
})();
