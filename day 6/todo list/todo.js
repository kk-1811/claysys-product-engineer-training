var inptext = document.getElementById("inputtext");
var addbttn = document.getElementById("addbtn");
var list = document.getElementById("list-container");
addbttn.disabled = true;

inptext.addEventListener("input", function () {
  addbttn.disabled = inptext.value.trim() === "";
});

function add() {
  var listitem = document.createElement("li");
  listitem.innerHTML =
    "<input class='check' type='checkbox' onchange='strike(event)'> " +
    inptext.value +
    " <button class='btn2' onclick='delete1(event)'>Delete</button>";
  list.append(listitem);
  inptext.value = "";
  addbttn.disabled = true;
}

function delete1(event) {
  event.target.parentElement.remove();
}

function strike(event) {
    var checkbox = event.target;
    var listitem = checkbox.parentElement;

    if (checkbox.checked) {
        listitem.style.textDecoration = "line-through";
        listitem.style.color = "gray";
    } else {
        listitem.style.textDecoration = "none";
        listitem.style.color = "black";
    }
}

