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
        add = eval(answer.textContent);
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

function add(a,b)
{
    return Number(a)+Number(b);
}

function subtract(a,b)
{
    return a-b;
}

function multiply(a,b)
{
    return a*b;
}

function divide(a,b)
{
    return a/b;
}

function eval(exp) {
    exp = exp.split("");
    let num = "";
    let nums = [];
    let op = [];
    let multiDivideNum = false; // waits for remaining num for multiplying/dividing

    for (let i = 0; i < exp.length; i++)
    {
        while (i < exp.length)
        {
            if (exp[i] == "+" || (exp[i] == "-" && num.length > 0) || exp[i] == "/" || exp[i] == "x")
            {
                if (multiDivideNum == true)
                {
                    op.splice(1,0, exp[i]);
                    break;
                }
                if (exp[i] == "/" || exp[i] == "x")
                {
                    multiDivideNum = true;
                }
                op.splice(0,0,exp[i]);
                nums.splice(0,0,num);
                num = "";
                i++;
            }
            num += exp[i];
            i++;
        }
        nums.splice(0,0,num);
        num = "";
        multiDivideNum = false;
        if ((op[0] == "x" || op[0] == "/"))
        {
            if (op[0] == "x")
            {
                nums.splice(0,2,multiply(nums[1],nums[0]));
            }
            else
                nums.splice(0,2,divide(nums[1],nums[0]));
            op.splice(0,1);
            if (op[0] == "x" || op == "/")
                multiDivideNum = true;
        }
    }
    while (op.length > 0)
    {
        if (op.pop() == "+")
        {
            nums.push(add(nums.pop(),nums.pop()));
        }
        else
            nums.push(subtract(nums.pop(), nums.pop()));
    }
    return nums;
}