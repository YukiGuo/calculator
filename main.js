const calculator = document.querySelector('.calculator')
const keys = document.querySelector('.keyboard')

const screen1 = document.querySelector('.screen1')//上面的屏幕
const screen2 = document.querySelector('.screen2')//下面的屏幕
const history = document.querySelector('.history')//历史记录
let historyArray = []
let symbol
let symbolIndex
let num1 //计算公式里的第一个值
let num2 //计算公式里的第二个值
keys.addEventListener("click", e => {
    Array.from(keys.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'))
    // console.log(e.target.textContent)
    let keyType = e.target.dataset.type
    let keyContent = e.target.textContent
    let screenNum1 = screen1.value
    let screenNum2 = screen2.value



    const previousKeyType = calculator.dataset.previousKeyType
    if (keyType === 'number') {
        // console.log('number key!')
        console.log(symbol)
        if (screenNum2 === '0') {
            screen2.value = keyContent
        } else {
            screen2.value = screenNum2 + keyContent
        }
        if (symbol === undefined) {
            num1 = screen2.value
            num2 = undefined
        } else {
            num1 = screen2.value.substring(0, symbolIndex)
            num2 = screen2.value.substring(symbolIndex + 1)
        }
        console.log(num1 + "&" + num2)
    } else if (keyType === "plus" || keyType === "subtract" || keyType === "divide" || keyType === "multiply") {
        if (!symbol) {
            symbol = keyContent
            console.log('operator key')
            console.log("symbol" + symbol)
            screen2.value = screenNum2 + keyContent
            symbolIndex = screen2.value.indexOf(symbol)
            console.log(symbolIndex)
            keys.classList.add('is-depressed')//?
            calculator.dataset.previousKeyType = 'operator'//?
        }
    } else if (keyType == "") {

    } else if (keyType === "decimal") {
        let a = screen2.value.substring(symbolIndex + 1)
        if (symbol === undefined) {
            if (!screen2.value.includes('.')) {
                console.log('num1没有点')
                screen2.value = screenNum2 + keyContent
            }
        } else {
            if (!(a.includes('.'))) {
                screen2.value = screenNum2 + keyContent
            }
        }

        console.log('decimal key!')

    }
    else if (keyType === "clear") {
        console.log('clear key!')
        screen2.value = ''
        screen1.value = ''
        history.innerHTML = ''
    }
    else if (keyType === "equal") {
        console.log('equal key!')
        symbol = ''
        screen1.value = screenNum2
        let answer = calculate(screenNum2)
        history.innerHTML += `<div>${screenNum2}=${answer}</div>`
        screen2.value = answer
    }
})


const calculate = (expression) => {
    let newExpression = expression
    if (expression.includes("÷")) {
        newExpression = expression.replace("÷", "/")
    } else if (expression.includes("×")) {
        newExpression = expression.replace("×", "*")
    }
    return eval(newExpression)
}