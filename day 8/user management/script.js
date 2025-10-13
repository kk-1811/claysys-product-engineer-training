var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var roleSelect = document.getElementById("role");
var addButton = document.getElementById("enter");
var userList = document.querySelector(".userlist ol");
var users = [];
function renderUsers() {
    userList.innerHTML = "";
    users.forEach(function (user, index) {
        var li = document.createElement("li");
        var userOptDiv = document.createElement("div");
        userOptDiv.classList.add("useropt");
        var detailsDiv = document.createElement("div");
        detailsDiv.classList.add("details");
        detailsDiv.innerHTML = "\n      <span>".concat(user.name, "</span>\n      <span>").concat(user.email, "</span>\n      <span>").concat(user.role, "</span>\n    ");
        var btnDiv = document.createElement("div");
        var editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit");
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete");
        editBtn.addEventListener("click", function () {
            nameInput.value = user.name;
            emailInput.value = user.email;
            roleSelect.value = user.role;
            addButton.textContent = "Update User";
            var updateHandler = function () {
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
        deleteBtn.addEventListener("click", function () {
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
    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    var role = roleSelect.value;
    if (!name || !email) {
        alert("Please enter name and email!");
        return;
    }
    var newUser = { name: name, email: email, role: role };
    users.push(newUser);
    renderUsers();
    clearInputs();
}
addButton.addEventListener("click", addUser);
