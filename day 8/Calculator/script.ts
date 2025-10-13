var inputBox = document.getElementById("numbox") as HTMLInputElement;

var buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll("button");
var currentExpression = "";

function updateDisplay() {
    inputBox.value = currentExpression;
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const id = button.id;

        switch (id) {
            case "clear":
                currentExpression = "";
                break;
            case "result":
                try {
                    currentExpression = eval(currentExpression) + "";
                } catch (e) {
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
