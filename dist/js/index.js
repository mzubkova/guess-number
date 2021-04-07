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

var count = 5;
var randomValue;

// user settings
function getAttempts(userAttemptValue) {
  userAttemptValue = +inputAttempt.value;

  if (userAttemptValue >= 1 && userAttemptValue <= 15) {
    count = userAttemptValue;
  } else {
    inputAttempt.classList.add("form-group__input-attempt--error");
  }
  return userAttemptValue;
}

function getRanges() {
  var validMin = +rangeMin.value;
  var validMax = +rangeMax.value;

  if (
    Number.isInteger(validMin && validMax) &&
    validMin &&
    validMax > 0 &&
    validMin < 200 &&
    validMax <= 200 &&
    validMin !== validMax
  ) {
    rangeMin.classList.add("form-group__input-min--success");
    rangeMax.classList.add("form-group__input-max--success");
  } else {
    validMin = 0;
    validMax = 0;
    rangeMin.classList.add("form-group__input-min--error");
    rangeMax.classList.add("form-group__input-max--error");
    output = `Введите корректный диапазон`;
    inputError.value = output;
  }

  var arr = [];
  arr.push(validMin, validMax);
  return arr;
}

function handleClick() {
  count--;
  if (count === 0) {
    var output = "Вы использовали все попытки (:";
    var result = document.querySelector(".text-attempts");
    result.insertAdjacentHTML("afterbegin", output);
    generateButton.classList.add("form__btn--disabled");
    generateButton.disabled = true;
    inputError.remove();
  }
}

function getRandomNumber(min, max) {
  var ranges = getRanges();
  min = +ranges[0];
  max = +ranges[1];

  var random = Math.floor(Math.random() * (max - min + 1) + min);
  randomValue = random;
}

function checkValidNumber(inputValue) {
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

function handleNumbers(e) {
  e.preventDefault();
  var output = "";
  var inputValue = +input.value;
  var validMin = +rangeMin.value || 0;
  var validMax = +rangeMax.value || 100;
  var secretNumber = randomValue || 75;

  if (checkValidNumber(inputValue) && getRanges()) {
    switch (inputValue >= validMin && inputValue <= validMax) {
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
        output = `Введите число! Осталось ${count} попыток`;
        inputError.value = output;
        break;
    }
  } else {
    output = `Введите корректное значение!  Осталось ${count} попыток`;
    inputError.value = output;
  }
}

function handleClearField() {
  input.value = "";
}

function handleClickGenerate(e) {
  handleClick();
  handleNumbers(e);
  checkValidNumber(e.target.value);
  handleClearField();
}

settingsButton.addEventListener("click", getRanges);
settingsButton.addEventListener("click", getRandomNumber);
settingsButton.addEventListener("click", getAttempts);
generateButton.addEventListener("click", handleClickGenerate);
exitButton.addEventListener("click", function (e) {
  inputError.remove();
});
