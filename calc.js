let numbers = document.querySelector(".numbers");
let answer = document.querySelector(".answer p");
let operators = Array.from(document.querySelectorAll(".operator button"));
operators = operators.map((x) => {return x.textContent})

let decimalPresent = false;
let numFinish = true;
let op = false;

generateNumbers();
buttons = document.querySelectorAll("button");

Array.from(buttons).forEach((x) => x.addEventListener("click",(e) => {
    let add = "";
    add = readButton(e.target.textContent, decimalPresent, numFinish, op);

    if ((add != "reset" && add != "") && answer.getAttribute("class") == "reset")
    {
        answer.classList.remove("reset");
    }
    
    if (add == ".")
    {
        decimalPresent = true;
        numFinish = false;
    }
    else if (operators.includes(add) && add == e.target.textContent && numFinish)
    {
        op = true;
        numFinish = false;
        decimalPresent = false;
    }
    else if (add == "-" && e.target.textContent == "(-)")
    {
        op = false;
        numFinish = false;
    }
    else if (e.target.textContent == "Del")
    {
        let remove = "";
        if (answer.textContent.length > 1 && answer.textContent != "reset" && answer.textContent != "ERROR")
        {
            remove = answer.textContent.slice(-1);
            answer.textContent = answer.textContent.substring(0,answer.textContent.length - 1);
            console.log(remove);
        }
        else
        {
            answer.textContent = "reset";
            if (answer.getAttribute("class") != "reset")
                answer.classList.toggle("reset");
        }
        if (!Number.isInteger(Number(answer.textContent.slice(-1))) && answer.textContent != "reset")
        {
            {
                if (answer.textContent.slice(-1) == ".")
                {
                    numFinish = false;
                }
                else if (operators.includes(answer.textContent.slice(-1)))
                {
                    if (operators.includes(answer.textContent.slice(-2,-1)))
                        op = false;
                    else
                        op = true;
                    numFinish = false;
                    decimalPresent = false;
                }
            }
        }
        else
        {
            numFinish = true;
            if (remove == ".")
            {
                decimalPresent = false;
            }
            else if (operators.includes(remove))
            {
                op = false;
            }
        }
    }
    else
    {
        if (add != "")
        {
            numFinish = true;
            op = false;
        }
    }
    
    if ((answer.textContent == "reset" || add == "reset" || e.target.textContent == "=") && add != "")
    {
        answer.textContent = add;
        op = false;
        numFinish = true;
        if (add == "reset" || (add.toString().length > 0 && Number.isInteger(Number(add))))
        {
            decimalPresent = false;
        }
        else if (add.toString().length > 1)
        {
            decimalPresent = true;
        }
    }
    else
    {
        if (add != "" && answer.textContent != "ERROR")
            answer.textContent += add;
    }
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

function readButton(text, decimalPresent, numFinish, op) {
    if (text == "AC")
    {
        if (answer.getAttribute("class") != "reset")
        {
            answer.classList.toggle("reset");
        }
        return "reset";
    }
    else if (text == "Del")
    {
        return "";
    }
    else if (text == "(-)")
    {
        if ((answer.textContent == "reset" || op) && !decimalPresent)
        {
            return "-";
        }
    }
    else if (operators.includes(text))
    {
        if (answer.textContent != "reset" && numFinish && !op)
        {
            return text;
        }
    }
    else if (text == ".")
    {
        if (!decimalPresent)
        {
            return ".";
        }
    }
    else if (text == "=")
    {
        return eval(answer.textContent);
    }
    else
    {
        return text;
    }
    return "";
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
            if (!Number.isFinite(nums[0]))
                return "ERROR";
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
    return Math.round(Number(nums)*10000)/10000;
}