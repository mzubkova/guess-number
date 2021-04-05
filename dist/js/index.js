var generateButton = document.querySelector(".form__btn--play");
var settingsButton = document.querySelector(".form-group__btn");
var exitButton = document.querySelector(".form__btn--exit");
var input = document.querySelector(".form__input");
var inputError = document.querySelector(".form__input--error");
var attempts = document.querySelector(".inner-guess__attempts");
var form = document.querySelector(".form");
var rangeMin = document.querySelector(".form-group__input-min");
var rangeMax = document.querySelector(".form-group__input-max");
var inputAttempt = document.querySelector(".form-group__input-attempt");
var resultSuccess = document.createElement("p");
resultSuccess.classList.add("text-success");

var output = "";
var count = 5;

// user settings
// function getAttempts(userAttemptValue) {
//   userAttemptValue = +inputAttempt.value;
//   console.log("userAttemptValue", userAttemptValue);

//   if (userAttemptValue >= 1 && userAttemptValue <= 15) {
//     count = userAttemptValue;
//     console.log("count", count);
//   } return userAttemptValue;
// }

function getRanges() {
  var validMin = +rangeMin.value;
  var validMax = +rangeMax.value;

  if (Number.isInteger(validMin) && validMin > 0 && validMin < 200) {
    rangeMin.classList.add("form-group__input-min--success");
  }
  if (Number.isInteger(validMax) && validMax > 0 && validMax <= 200) {
    rangeMax.classList.add("form-group__input-max--success");
  }
  var arr = [];
  arr.push(validMin, validMax);
  return arr;
}

function handleClick() {
  if (--count == 0) {
    var output = "Вы использовали все попытки (:";
    var result = document.querySelector(".text-attempts");
    result.insertAdjacentHTML("afterbegin", output);
    generateButton.classList.add("form__btn--disabled");
    generateButton.disabled = true;
    inputError.remove();
  }
}

var getRandomNumber = function (min, max) {
  var ranges = getRanges();
  min = ranges[0];
  max = ranges[1];

  console.log("min", min);
  console.log("max", max);
  var random = Math.floor(Math.random() * (max - min + 1) + min);
  console.log("random", random);
  return random;
};

function checkValidInput(inputValue) {
  inputValue = +input.value;
  if (
    !isNaN(inputValue) &&
    Number.isInteger(inputValue) &&
    inputValue <= 200 &&
    inputValue >= 1
  ) {
    return true;
  } else {
    return false;
  }
}

function defaultNumbers(e) {
  e.preventDefault();
  var secretNumber = 75;
  var output = "";
  var inputValue = +input.value;
  console.log("secretNumber default", secretNumber);

  if (checkValidInput(inputValue)) {
    switch (inputValue >= 1 && inputValue <= 100) {
      case inputValue === secretNumber:
        output = `Поздравляю! Ты угадал задуманное число "${inputValue}"`;
        resultSuccess.append(output);
        form.append(resultSuccess);
        generateButton.classList.add("form__btn--disabled");
        generateButton.disabled = true;
        inputError.remove();
        break;
      case inputValue < secretNumber:
        output = `Не угадал, загаданное число больше ${inputValue}! Осталось ${count} попыток`;
        inputError.value = output;
        break;
      case inputValue > secretNumber:
        output = `Не угадал, загаданное число меньше ${inputValue}! Осталось ${count} попыток`;
        inputError.value = output;
        break;
      default:
        output = `Введите корректный! Осталось ${count} попыток`;
        inputError.value = output;
        break;
    }
  } else {
    output = `Введите корректное значение!  Осталось ${count} попыток`;
    inputError.value = output;
  }
}

function handleNumbers(e) {
  e.preventDefault();
  var validMin = +rangeMin.value;
  var validMax = +rangeMax.value;
  var secretNumber = getRandomNumber();
  var output = "";
  var inputValue = +input.value;

  if (checkValidInput(inputValue) && getRanges()) {
    switch (inputValue >= validMin && inputValue <= validMax) {
      case inputValue === secretNumber:
        output = `Поздравляю! Ты угадал задуманное число "${inputValue}"`;
        resultSuccess.append(output);
        form.append(resultSuccess);
        generateButton.classList.add("form__btn--disabled");
        generateButton.disabled = true;
        inputError.remove();
        break;
      case inputValue < getRandomNumber():
        output = `Не угадал, загаданное число больше ${inputValue}! Осталось ${count} попыток`;
        inputError.value = output;
        break;
      case inputValue > getRandomNumber():
        output = `Не угадал, загаданное число меньше ${inputValue}! Осталось ${count} попыток`;
        inputError.value = output;
        break;
      default:
        output = `Введите число! Осталось ${count} попыток`;
        inputError.value = output;
        break;
    }
  } else {
    output = `Введите корректное значение!  Осталось ${count} попыток`;
    inputError.value = output;
  }
}

settingsButton.addEventListener("click", getRanges);
settingsButton.addEventListener("click", getRandomNumber);
// settingsButton.addEventListener("click", getAttempts);

if (getRandomNumber() && getRanges()) {
  generateButton.addEventListener("click", handleNumbers);
} else {
  generateButton.addEventListener("click", defaultNumbers);
}

generateButton.addEventListener("click", checkValidInput);
generateButton.addEventListener("click", handleClick);
generateButton.addEventListener("click", function (e) {
  input.value = "";
});
exitButton.addEventListener("click", function (e) {
  inputError.remove();
});
