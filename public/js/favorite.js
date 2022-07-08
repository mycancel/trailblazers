const favCheckBox = async (event) => {
  if (event.target.checked) {
    // pathname = '/park/:code'
    const pathname = window.location.pathname;
    const parkCode = pathname.slice(6);

    const response = await fetch("/api/favorites", {
      method: "POST",
      body: JSON.stringify({ parkCode: parkCode }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Park favorited.");
    } else {
      alert(response.statusText);
    }
  } else {
    // pathname = '/park/:code'
    const pathname = window.location.pathname;
    const parkCode = pathname.slice(6);

    const response = await fetch("/api/favorites", {
      method: "DELETE",
      body: JSON.stringify({ parkCode: parkCode }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Park unfavorited.");
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('#favorite-check').addEventListener('change', favCheckBox)
