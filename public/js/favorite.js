const favBtn = document.querySelector('#favorite-check');

const changeFavorite = async (event) => {
  if (favBtn.textContent === 'Favorite') {
    // pathname = '/park/:code'
    const pathname = window.location.pathname;
    const parkCode = pathname.slice(6);
    const parkName = event.target.value;

    const response = await fetch("/api/favorites", {
      method: "POST",
      body: JSON.stringify({ parkCode: parkCode, name: parkName }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Park favorited.");
      favBtn.textContent = 'Unfavorite';
    } else {
      alert(response.statusText);
    }
  } else {
    // // pathname = '/park/:code'
    // const pathname = window.location.pathname;
    // const parkCode = pathname.slice(6);
    const parkName = event.target.value;

    const response = await fetch("/api/favorites", {
      method: "DELETE",
      body: JSON.stringify({ name: parkName }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Park unfavorited.");
      favBtn.textContent = 'Favorite';
    } else {
      alert(response.statusText);
    }
  }
};

favBtn.addEventListener('click', changeFavorite)
