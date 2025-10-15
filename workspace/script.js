
const good = document.getElementById("check");
const cheap = document.getElementById("check1");
const fast = document.getElementById("check2");

good.addEventListener("change", toggleup)
cheap.addEventListener("change", toggleup1)
fast.addEventListener("change", toggleup2)

function toggleup() {
    if (good.checked) {
        cheap.checked = false
        fast.checked = false
    }
}
function toggleup1() {
    if (cheap.checked) {
        good.checked = false
        fast.checked = false
    }
}

function toggleup2() {
    if (fast.checked) {
        good.checked = false
        cheap.checked = false
    }
}































