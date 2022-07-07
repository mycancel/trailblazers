const formHandler = async (event) => {
  event.preventDefault();

  // TODO: add .value and .trim to query selections in variables below
  const stateCode = document.querySelector('#search-form').value();
  const activityId = document.querySelector('#search-form').value();

  // Send fetch request get search results
  const response = await fetch("/search", {
    method: "GET",
    body: JSON.stringify({ stateCode: stateCode, activityId: activityId }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/search");
  } else {
    alert("Failed to find parks.");
  }
};

document.querySelector('#search-form').addEventListener('submit', formHandler);