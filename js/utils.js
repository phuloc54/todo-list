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
