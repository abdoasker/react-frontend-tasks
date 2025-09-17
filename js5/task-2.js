function displayUser(user) {
  const card = document.getElementById("profile-card");
  card.innerHTML = "";
  for (let key in user) {
    if (typeof user[key] !== "object") {
      let p = document.createElement("p");
      p.innerHTML = `<strong>${key}:</strong> ${user[key]}`;
      card.appendChild(p);
    }
  }
}

// Load from sessionStorage
window.addEventListener("load", () => {
  let stored = sessionStorage.getItem("currentUser");
  if (stored) displayUser(JSON.parse(stored));
});

// Fetch random user
document.getElementById("get-user-btn").addEventListener("click", () => {
  let randomId = Math.floor(Math.random() * 10) + 1;
  let xhr = new XMLHttpRequest();
  xhr.open("GET", `https://jsonplaceholder.typicode.com/users/${randomId}`);
  xhr.onload = function () {
    if (xhr.status === 200) {
      let user = JSON.parse(xhr.responseText);
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      displayUser(user);
    } else {
      alert("Failed to load user.");
    }
  };
  xhr.send();
});
