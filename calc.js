let numbers = document.querySelector(".numbers");
let answer = document.querySelector(".answer p");
let mode = document.querySelector("#calcMode");
let operators = Array.from(document.querySelectorAll(".operator button"));
operators = operators.map((x) => {return x.textContent})
let exp = "";

let decimalPresent = false;
let numFinish = true;
let op = false;

generateNumbers();
buttons = document.querySelectorAll("button");

Array.from(buttons).forEach((x) => x.addEventListener("click",(e) => {
    let add = "";
    add = readButton(e.target.textContent, decimalPresent, numFinish, op);

    if ((add != "reset" && add.length > 0) && answer.getAttribute("class") == "reset")
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
        if ((mode.value == "Simple" && exp.length > 1) ||
            (answer.textContent.length > 1 && answer.textContent != "reset" && answer.textContent != "ERROR"))
        {
            if (mode.value == "Simple")
                remove = exp.slice(-1);
            else
                remove = answer.textContent.slice(-1);
            if (mode.value == "Simple")
            {
                exp = exp.slice(0,-1);
                if (answer.textContent.slice(-1) == remove)
                {
                    answer.textContent = answer.textContent.slice(0,-1);
                    if (answer.textContent.length < 1)
                        {
                            answer.textContent = "reset";
                            if (answer.getAttribute("class") != "reset")
                                answer.classList.toggle("reset");
                        }
                }
                if (Number.isFinite(Number(exp)))
                {
                    if (exp.length > 0)
                    {
                        answer.textContent = exp;
                        answer.classList.remove("reset");
                    }
                    else
                    {
                        answer.textContent = "reset";
                            if (answer.getAttribute("class") != "reset")
                                answer.classList.toggle("reset");
                    }
                }
            }
            else 
            {
                answer.textContent = answer.textContent.slice(0,-1);
            }
        }
        else
        {
            answer.textContent = "reset";
            if (answer.getAttribute("class") != "reset")
                answer.classList.toggle("reset");
            if (mode.value == "Simple")
                exp = exp.slice(0,-1);
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
    
    if ((mode.value == "Simple" && ((operators.includes(add) && answer.textContent != "reset" && e.target.textContent != "(-)") || exp.length < 1))
        || ((answer.textContent == "reset" || add == "reset" || e.target.textContent == "=") && add != ""))
    {
        if (operators.includes(exp.slice(-1)) && operators.includes(add) && e.target.textContent != "(-)")
        {
            exp = exp.slice(0,-1) + add;
            answer.classList.toggle("reset");
        }
        else if (mode.value == "Simple" && operators.includes(add) && answer.textContent != "reset" && e.target.textContent != "(-)")
        {
            exp += add;
            answer.textContent = "reset";
            answer.classList.toggle("reset");
            if (operators.filter((x) => {return exp.slice(0,-1).includes(x);}).length > 0
             && Number.isNaN(Number(exp.slice(0,-1))))
             {
                exp = eval(exp.slice(0,-1)) + exp.slice(-1);
                answer.textContent = exp.slice(0,-1);
                answer.classList.toggle("reset");
             }
        }
        else
        {
            if (e.target.textContent != "Del")
                answer.textContent = add;
            if (mode.value == "Simple" && e.target.textContent != "Del")
                exp += add;
        }
        if (mode.value == "Simple" && e.target.textContent == "=" || e.target.textContent == "AC")
            exp = "";
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
        if (mode.value == "Simple" && !Number.isNaN(Number(exp.slice(0,-1))) && operators.includes(exp.slice(-1)) && add != "" && 
        exp.length > 1)
            answer.textContent = add;
        else if (add != "" && answer.textContent != "ERROR")
        {
            answer.textContent += add;
        }
        if (mode.value == "Simple")
            exp += add;
    }
}));

window.addEventListener("keydown", (e) => {
    let key = keyRead(e);
    let keyEvent = new MouseEvent("click");
    let elm = Array.from(buttons).find((x) => {return x.textContent == key});
    if (key != "")
        elm.dispatchEvent(keyEvent);
});

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

function keyRead(e) {
    if (Array.from(buttons).map((x) => {return x.textContent}).includes(e.key))
        {
            if (e.key == "-")
            {
                if (readButton("(-)",decimalPresent,numFinish,op) != "")
                    return "(-)";
                else
                    return "-";
            }
            else
                return e.key;
        }
    else if (e.key == "Backspace")
        return "Del";
    else if (e.key == "Enter")
        return "=";
    else if (e.key == "*")
        return "x";
    return "";
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
        if ((answer.textContent == "reset" || op || (mode.value == "Simple" && exp.length < 1)) && !decimalPresent)
        {
            return "-";
        }
    }
    else if (operators.includes(text))
    {
        if (answer.textContent != "reset" && numFinish && !op || mode.value == "Simple")
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
        if (mode.value == "Simple")
            return eval(exp);
        else
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
    if (exp == "reset")
        return "0";
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
    if (!Number.isFinite(Number(nums)))
        return "ERROR";
    return (Math.round(Number(nums)*10000)/10000).toString();
}