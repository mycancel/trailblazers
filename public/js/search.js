const formHandler = async (event) => {
  event.preventDefault();

  // TODO: add .value and .trim to query selections in variables below
  const stateCode = "MD";
  const activityId = "C11D3746-5063-4BD0-B245-7178D1AD866C";

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

// TODO: add queryselectors
// document.querySelector('').addEventListener('submit', formHandler);