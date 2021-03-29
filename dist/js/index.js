var generateButton = document.querySelector(".form__btn--play");
var exitButton = document.querySelector(".form__btn--exit");
var input = document.querySelector("input");
var inputError = document.querySelector(".form__input--error");
var attempts = document.querySelector(".inner-guess__attempts");
var form = document.querySelector(".form");

var resultSuccess = document.createElement("p");
resultSuccess.classList.add("text-success");

var count = 0;
var output = "";

var handleClick = function clicks() {
  count++;
  if (count === 15) {
    var output = "Вы использовали все попытки (:";
    var result = document.querySelector(".text-attempts");
    result.insertAdjacentHTML("afterbegin", output);
    generateButton.classList.add("form__btn--disabled");
    generateButton.disabled = true;
    inputError.remove();
  } else {
    console.log(count);
  }
};

function handleNumbers(e) {
  e.preventDefault();
  var secretNumber = 7;
  var inputValue = +input.value;

  if (Number.isInteger(inputValue) && inputValue <= 200 && inputValue >= 1) {
    var oddSingleNumber = inputValue % 2 === 0;
    var strValue = inputValue.toString();
    var unitNumber = strValue.length == 1;

    if (inputValue == secretNumber) {
      output = `Поздравляю! Ты угадал задуманное число "${inputValue}"`;
      resultSuccess.append(output);
      form.append(resultSuccess);
      generateButton.classList.add("form__btn--disabled");
      generateButton.disabled = true;
      inputError.remove();
    } else if (unitNumber && !oddSingleNumber) {
      output = `Не угадал, но очень близко к числу ${inputValue}! попытка: ${
        count + 1
      }`;
      inputError.value = output;
    } else if (unitNumber && oddSingleNumber) {
      output = `Не угадал, но близко от числа ${inputValue}! попытка: ${
        count + 1
      } \n`;
      inputError.value = output;
    } else if (inputValue >= 50 && inputValue <= 100) {
      output = `Не угадал, ${inputValue} очень далеко от числа! попытка: ${
        count + 1
      }`;
      inputError.value = output;
    } else {
      output = `Не угадал, число меньше чем ${inputValue}! попытка: ${
        count + 1
      }`;
      inputError.value = output;
    }
  } else {
    output = `Введите целое число от 1 до 200`;
    inputError.value = output;
  }
}

generateButton.addEventListener("click", handleNumbers);
generateButton.addEventListener("click", handleClick);
generateButton.addEventListener("click", function (e) {
  input.value = "";
});

exitButton.addEventListener("click", function (e) {
  inputError.remove();
});
