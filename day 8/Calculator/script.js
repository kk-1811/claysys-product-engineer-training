var inputBox = document.getElementById("numbox");
var buttons = document.querySelectorAll("button");
var currentExpression = "";
function updateDisplay() {
    inputBox.value = currentExpression;
}
buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        var id = button.id;
        switch (id) {
            case "clear":
                currentExpression = "";
                break;
            case "result":
                try {
                    currentExpression = eval(currentExpression) + "";
                }
                catch (e) {
                    currentExpression = "Error";
                }
                break;
            case "add":
                currentExpression += "+";
                break;
            case "sub":
                currentExpression += "-";
                break;
            case "multiply":
                currentExpression += "*";
                break;
            case "divide":
                currentExpression += "/";
                break;
            default:
                currentExpression += button.innerText;
        }
        updateDisplay();
    });
});
