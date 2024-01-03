let screenValue = document.getElementsByClassName('calc-value')[0];
let buttons = document.querySelectorAll('.row3 button');
let submit = document.querySelector('button[value="="]');
let theme = document.getElementsByClassName('switch')[0];
let page = document.getElementsByTagName('body')[0];




function handleTheme() {
    if (page.classList.contains('theme-one')) {
        page.classList.remove('theme-one');
        page.classList.add('theme-two');
    } else if (page.classList.contains('theme-two')) {
        page.classList.remove('theme-two');
        page.classList.add('theme-three');
    } else if (page.classList.contains('theme-three')) {
        page.classList.remove('theme-three');
        page.classList.add('theme-one');
    }
}

theme.addEventListener('click', () => {
    handleTheme();
});


let sets = [];
let currentSet = '';
function handleDisplay(value) {
    if (value === 'reset') {
        clearValues();
    } else if (value === '=') {
        calculateResult();
    } else if (value === 'del') {
        deleteLastCharacter();
    } else if (isOperator(value)) {
        if (currentSet !== '') {
            sets.push(currentSet);
            sets.push(value);
            currentSet = '';
        } else if (sets.length > 0 && isOperator(sets[sets.length - 1])) {
            sets[sets.length - 1] = value;
        }
    } else {
        if (currentSet.length < 15) {
            currentSet += value;
        }
    }

    updateDisplay();
}

function isOperator(value) {
    return ['*', '+', '/', '-'].includes(value);
}

function calculateResult() {
    if (currentSet !== '') {
        sets.push(currentSet);
    }

    if (sets.length % 2 !== 0) {
        screenValue.textContent = 'Error';
        return;
    }

    try {
        while (sets.length > 1) {
            const num1 = parseFloat(sets.shift());
            const operator = sets.shift();
            const num2 = parseFloat(sets.shift());

            const result = performCalculation(num1, operator, num2);
            sets.unshift(result.toString());

            screenValue.textContent = sets[0];
            currentSet = '';
            sets = [];
        }
    } catch (error) {
        screenValue.textContent = 'ERROR';
        currentSet = '';
        sets = [];
    }
}
function performCalculation(num1, operator, num2) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 === 0) {
                throw new Error('Division by zero');
            }
        return num1 / num2;
    }
}

function clearValues() {
    sets = [];
    currentSet = '';
}

function updateDisplay() {
    screenValue.textContent = sets.join(' ') + ' ' + currentSet;
}

function deleteLastCharacter() {
    if (currentSet !== '') {
        currentSet = currentSet.slice(0, -1)
    }  else if (sets.length > 0) {
        sets[sets.length - 1] = sets[sets.length - 1].slice(0, -1);
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleDisplay(button.value);
    });
});

submit.addEventListener('click', () => {
    calculateResult();
});