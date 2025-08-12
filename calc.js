numbers = document.querySelector(".numbers");
answer = document.querySelector(".answer p");

generateNumbers();
buttons = document.querySelectorAll("button");

Array.from(buttons).forEach((x) => x.addEventListener("click",(e) => {
    let add = "";
    if (answer.textContent == "reset")
    {
        answer.classList.toggle("reset");
    }
    if (e.target.textContent == "(-)")
        add += "-";
    else if (e.target.textContent == "AC")
    {
        answer.textContent = "reset";
        answer.classList.toggle("reset");
    }
    else if (e.target.textContent == "=")
        add = eval();
    else
        add += e.target.textContent;
    if ((answer.textContent == "reset" && answer.getAttribute("class") == "") || e.target.textContent == "=")
        answer.textContent = add;
    else
        answer.textContent += add;
}));

function generateNumbers()
{
    decimal = document.querySelector(".numbers button");
    for (let i = 9; i >= 0; i--)
    {
        let num = document.createElement("button");
        num.textContent = `${i}`;
        if (num.textContent != "0")
            numbers.insertBefore(num, decimal);
        else
            numbers.appendChild(num);
    }
}

function eval() {
    console.log("evaluate");
    return "answer";
}