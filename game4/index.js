let input = document.querySelector('.input');
let buttonRestart = document.querySelector('.restart_game');
let messege = document.querySelector('.messege');
let messegeError = document.querySelector('.messege_error');
let messegeHint = document.querySelector('.messege_hint');
let buttonCheck = document.querySelector('.check');
let attemptsCounterDisplay = document.querySelector('.counterDisplay');
let startRangeInput = document.querySelector('.startRange');
let endRangeInput = document.querySelector('.endRange');

let compNumber; // переменная для хранения числа компьютера
let attemptsCounter = 0; // счетчик попыток пользователя
const maxAttemptsBeforeHint = 3; // максимальное число попыток перед подсказкой

// Функция для обновления числа компьютера в заданном диапазоне
function updateCompNumber() {
  let startRange = parseInt(startRangeInput.value) || 1;
  let endRange = parseInt(endRangeInput.value) || 100;
  compNumber = getRundomInt(startRange, endRange);
}

// Функция для инициализации игры
function initializeGame() {
  updateCompNumber(); // обновляем число компьютера
  attemptsCounter = 0; // сбрасываем счетчик попыток
  messege.innerHTML = ''; // очищаем сообщение о результате
  input.value = ''; // очищаем поле ввода пользователя
  messegeError.innerHTML = ''; // очищаем сообщение об ошибке
  attemptsCounterDisplay.innerHTML = ''; // очищаем счетчик попыток
  messegeHint.innerHTML = ''; // очищаем подсказку
}

// Вызываем функцию initializeGame при загрузке скрипта и после обновления числа компьютера
initializeGame();
updateCompNumber();

// Обработчик события клика на кнопке "Проверить"
buttonCheck.addEventListener('click', () => {
  let userNumber = parseInt(input.value); // преобразуем введенное пользователем значение в число
  attemptsCounter++; // увеличиваем счетчик попыток

  if (isNaN(userNumber)) {
    // Пользователь ввел не число
    messegeError.innerHTML = 'Пожалуйста, введите корректное число.';
  } else {
    // Пользователь ввел число

    if (userNumber == compNumber) {
      messege.innerHTML = 'Победа!'; // пользователь угадал число
      messegeError.innerHTML = ''; // очищаем сообщение об ошибке
      messegeHint.innerHTML = ''; // очищаем подсказку

      // Перезапускаем игру
      // initializeGame();
      // updateCompNumber();
    } else if (userNumber > compNumber) {
      messege.innerHTML = 'Число меньше'; // пользователь ввел слишком большое число
    } else {
      messege.innerHTML = 'Число больше'; // пользователь ввел слишком маленькое число
    }

    // Обновляем отображение счетчика попыток
    attemptsCounterDisplay.innerHTML = `Попыток: ${attemptsCounter}`;

    // Добавляем подсказку о четности/нечетности каждые три попытки
    if (attemptsCounter % maxAttemptsBeforeHint === 0) {
      if (compNumber % 2 === 0) {
        messegeHint.innerHTML = ' Число четное';
      } else {
        messegeHint.innerHTML = ' Число нечетное';
      }
    }
  }

  // Проверяем, входит ли введенное число в допустимый диапазон
  if (
    userNumber > parseInt(endRangeInput.value) ||
    userNumber < parseInt(startRangeInput.value)
  ) {
    messegeError.innerHTML =
      'Число вне диапазона. Пожалуйста, введите число в заданном диапазоне.';
  } else {
    messegeError.innerHTML = ''; // очищаем сообщение об ошибке
  }
});

// Обработчик события клика на кнопке "Начать заново"
buttonRestart.addEventListener('click', () => {
  // Обнуляем значения полей начального и конечного значения
  startRangeInput.value = '';
  endRangeInput.value = '';

  // Перезапуск игры
  initializeGame();
  updateCompNumber();
});

// Слушаем изменения в полях ввода startRange и endRange
startRangeInput.addEventListener('input', updateCompNumber);
endRangeInput.addEventListener('input', updateCompNumber);

// Функция для генерации случайного целого числа в заданном диапазоне
function getRundomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
