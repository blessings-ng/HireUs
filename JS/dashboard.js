const API_URL = "http://localhost:3000/users";

async function fetchUsers() {
  const response = await fetch(API_URL);
  const users = await response.json();

  const userList = document.getElementById("user-list");
  userList.innerHTML = users
    .map(
      (user) => `
    <div class="user-card">
      <img src="${user.avatarUrl}" alt="${user.name}">
      <h3>${user.name}</h3>
      <p>${user.bio}</p>
      <p><strong>Skills:</strong> ${user.skills}</p>
    </div>
  `
    )
    .join("");
}

fetchUsers();
