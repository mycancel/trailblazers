const formHandler = async (event) => {
  // TODO: retrieve parkCode from clicking on the park (data class? name? URL?)
  const parkCode = "cato";

  // Send fetch request to create a new article
  const response = await fetch("/park", {
    method: "GET",
    body: JSON.stringify({ parkCode: parkCode }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/parkpage");
  } else {
    alert("Failed to find park data.");
  }
};

// TODO: add queryselectors
// document.querySelector('').addEventListener('click', formHandler);