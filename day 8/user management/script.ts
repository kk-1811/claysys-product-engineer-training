const nameInput = document.getElementById("name") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const roleSelect = document.getElementById("role") as HTMLSelectElement;
const addButton = document.getElementById("enter") as HTMLButtonElement;
const userList = document.querySelector(".userlist ol") as HTMLOListElement;

interface User {
  name: string;
  email: string;
  role: string;
}

let users: User[] = [];

function renderUsers() {
  userList.innerHTML = "";

  users.forEach((user, index) => {
    const li = document.createElement("li");

    const userOptDiv = document.createElement("div");
    userOptDiv.classList.add("useropt");

    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("details");
    detailsDiv.innerHTML = `
      <span>${user.name}</span>
      <span>${user.email}</span>
      <span>${user.role}</span>
    `;

    const btnDiv = document.createElement("div");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete");

    editBtn.addEventListener("click", () => {
      nameInput.value = user.name;
      emailInput.value = user.email;
      roleSelect.value = user.role;

      addButton.textContent = "Update User";

      const updateHandler = () => {
        users[index] = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          role: roleSelect.value,
        };
        renderUsers();
        clearInputs();
        addButton.textContent = "Add User";

        addButton.removeEventListener("click", updateHandler);
        addButton.addEventListener("click", addUser);
      };

      addButton.removeEventListener("click", addUser);
      addButton.addEventListener("click", updateHandler);
    });

    deleteBtn.addEventListener("click", () => {
      users.splice(index, 1);
      renderUsers();
    });

    btnDiv.appendChild(editBtn);
    btnDiv.appendChild(deleteBtn);

    userOptDiv.appendChild(detailsDiv);
    userOptDiv.appendChild(btnDiv);
    li.appendChild(userOptDiv);
    userList.appendChild(li);
  });
}

function clearInputs() {
  nameInput.value = "";
  emailInput.value = "";
  roleSelect.value = "admin";
}

function addUser() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const role = roleSelect.value;

  if (!name || !email) {
    alert("Please enter name and email!");
    return;
  }

  const newUser: User = { name, email, role };
  users.push(newUser);

  renderUsers();
  clearInputs();
}

addButton.addEventListener("click", addUser);
