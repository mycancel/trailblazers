const formHandler = async (event) => {
  event.preventDefault();

  const stateCode = document.querySelector('#state-code').value;
  const activityId = document.querySelector('#activity-id').value;

  // Send fetch request get search results
  const response = await fetch('/', {
    method: 'POST',
    body: JSON.stringify({ stateCode: stateCode, activityId: activityId }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to find parks.');
  }
};

document.querySelector('#search-form').addEventListener('submit', formHandler);