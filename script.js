'use strict';

// let variables
let streak = 0;
let correct = 0;
let wrong = 0;
let timesAdder = 0;
let correctPercentage = 100;
let choiceRandom = 10;
let readyForTimes = false;
let readyForDivision = false;
let runChoice = false;
let random1Add = 10;
let random1Sub = 25;
let random1Multiply = 10;
let numberValue, number1, number2, answer;
let symbol = 'Add';

// const variables
const problemEl = document.querySelector('.problem');
const label = document.querySelector('.label');
const scoreArea = document.querySelector('#score-area');
const division = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Decides what symbol will be used in the problem
function choice() {
  let x = Math.trunc(Math.random() * choiceRandom) + 0;
  if (readyForTimes === true) choiceRandom = 15;
  if (random1Multiply >= 13) choiceRandom = 20;
  if (x <= 3) {
    symbol = 'Add';
  } else if (x > 3 && x <= 8) {
    symbol = 'Sub';
  } else if (readyForTimes === true && x > 8 && x <= 13) {
    symbol = 'Times';
  } else if (readyForDivision === true && x > 13) {
    symbol = 'Div';
  }
}

// Generates the problem
const problem = function () {
  if (symbol === 'Add') {
    number1 = Math.trunc(Math.random() * random1Add);
    number2 = Math.trunc(Math.random() * random1Add);
    answer = number1 + number2;
    problemEl.textContent = `${number1} + ${number2} =`;
  } else if (symbol === 'Sub') {
    number1 = Math.trunc(Math.random() * random1Sub);
    number2 = Math.trunc(Math.random() * random1Sub);
    answer = number1 - number2;
    while (number1 < number2) {
      // Makes sure that the first number is greater than the 2nd number in the subtraction equation
      number1 = Math.trunc(Math.random() * random1Sub);
      number2 = Math.trunc(Math.random() * random1Sub);
      answer = number1 - number2;
    }
    problemEl.textContent = `${number1} - ${number2} =`;
  } else if (symbol === 'Times') {
    number1 = Math.trunc(Math.random() * random1Multiply);
    number2 = Math.trunc(Math.random() * random1Multiply);
    answer = number1 * number2;
    problemEl.textContent = `${number1} x ${number2} =`;
  } else if ('Div') {
    number2 = division[Math.trunc(Math.random() * division.length)];
    number1 = number2 * Math.trunc(Math.random() * 11);
    while (!number1) {
      number1 = number2 * Math.trunc(Math.random() * 11);
    }
    answer = number1 / number2;
    problemEl.textContent = `${number1} ÷ ${number2} =`;
  }
};
problem();

// Main function when check answer is clicked
scoreArea.textContent = `✔️${correct} ❌${wrong} |✔️${correctPercentage}%`;
function answerQuestion() {
  numberValue = document.getElementById('myText').value;
  if (numberValue !== '') {
    numberValue = Number(document.getElementById('myText').value);
    if (answer === numberValue) {
      streak++;
      correct++;
      if (random1Add >= 24) {
        runChoice = true;
      }
      if (random1Add < 25) {
        random1Add++;
      }
      if (random1Sub < 50 && random1Add >= 25) {
        random1Sub++;
      }
      if (random1Sub === 50) {
        readyForTimes = true;
      }
      if (readyForTimes === true) {
        timesAdder++;
      }
      if (timesAdder >= 10) {
        random1Multiply++;
        timesAdder = 0;
      }
      if (random1Multiply >= 13) {
        readyForDivision = true;
      }
      if (streak < 3) {
        label.textContent = '✔️';
        label.classList.remove('hidden');
      } else {
        label.textContent = `${streak}🔥`;
        label.classList.remove('hidden');
      }
      correctPercentage =
        Math.round(10 * (correct / (wrong + correct)) * 100) / 10;
      scoreArea.textContent = `✔️${correct} ❌${wrong} |✔️${correctPercentage}%`;
    } else {
      wrong++;
      label.textContent = '❌';
      label.classList.remove('hidden');
      scoreArea.textContent = `The correct answer was ${answer}`;
      correctPercentage =
        Math.round(10 * (correct / (wrong + correct)) * 100) / 10;
      streak = 0;
      if (random1Add > 10) {
        random1Add -= 2;
      }
      if (random1Sub > 25) {
        random1Sub -= 3;
      }
    }
    if (runChoice === true) {
      choice();
    }
    problem();
  }
}

function hideCheckmark() {
  if (streak < 3) label.classList.add('hidden');
  scoreArea.textContent = `✔️${correct} ❌${wrong} |✔️${correctPercentage}%`;
}
