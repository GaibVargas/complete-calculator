var result, 
    currentNumber = '',
    oldNumber = '',
    operator = '';

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.op');
const equal = document.querySelector('.equal');
const view = document.querySelector('.viewer');
const clear = document.querySelector('.clear');
const clearAll = document.querySelector('.allClear');

function setValues(val) {
  if(currentNumber.toString().length >= 8) return;
  currentNumber += val;

  view.innerHTML = currentNumber;
}

function moveValues(op) {
  operator = op;
  oldNumber = currentNumber;
  currentNumber = '';
}

function calculate() {
  const value1 = parseFloat(oldNumber);
  const value2 = parseFloat(currentNumber);

  switch(operator) {
    case 'divided by':
      result = value1 / value2;
      break;
    case 'times':
      result = value1 * value2;
      break;
    case 'plus':
      result = value1 + value2;
      break;
    case 'minus':
      result = value1 - value2;
      break;
    default:
      result = value2;
  }

  if(result === NaN) {
    return view.innerHTML = "I'm broken :(";
  } else if(result.toString().length >= 8) {
    return view.innerHTML = "ERR";
  } else if(result === Infinity) {
    return view.innerHTML = "The world will explode!";
  }

  view.innerHTML = result;
  oldNumber = '';
  currentNumber = result;
}

function clearField() {
  view.innerHTML = '0';
  currentNumber = '';
}

function clearStatus() {
  result = '';
  currentNumber = '';
  oldNumber = '';
  operator = '';
  view.innerHTML = '0';
}

numbers.forEach(number => {
  number.addEventListener('click', () => {
    const value = number.getAttribute('data-numb');
    setValues(value);
  });
});

operators.forEach(operator => {
  operator.addEventListener('click', () => {
    const op = operator.getAttribute('data-op');
    moveValues(op);
  });
});

equal.addEventListener('click', () => calculate());

clear.addEventListener('click', () => clearField());

clearAll.addEventListener('click', () => clearStatus());
