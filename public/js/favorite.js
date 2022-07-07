const favCheckBox = async () => {
  // TODO: Check if this.checked returns a boolean value
  // console.log(this.checked);
  if (this.checked) {
    // pathname = '/park/:code'
    const pathname = window.location.pathname;
    const parkCode = pathname.slice(6);
    // TODO: Check if parkCode is correct
    // console.log(parkCode)

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
    // TODO: Check if parkCode is correct
    // console.log(parkCode)

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

// TODO: queryselect input type=checkbox
// document.querySelector('').addEventListener('change', favCheckBox)
