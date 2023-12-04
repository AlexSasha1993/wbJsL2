// в пустую строку будем собирать текущий шаг (кто ходит)
let step = '';

let spanWho = document.getElementById('spanWho');

let winner = '';

//создаем функцию которая определяет чей ход

const who = () => {
  if (step === 'circle') {
    step = 'krestic';
    spanWho.innerText = 'Крестик';
  } else {
    step = 'circle';
    spanWho.innerText = 'Нолик';
  }
};
who();

// создаем переменную которая будет получать все item
let blockItem = document.querySelectorAll('.blockItem');

let counter = 0;

blockItem.forEach((item) => {
  //добавляем слушатель на клик
  item.addEventListener('click', () => {
    // проверяем чтобы класс НЕ включал класс круг и крест чтобы повтороно не могли кликать.
    if (
      !item.classList.contains('circle') &&
      !item.classList.contains('krestic')
    ) {
      //добавляем шаг
      item.classList.add(step);

      // проверяем чей ход и присваиваем Х или 0
      if (step === 'krestic') {
        item.innerText = 'X';
      }
      if (step === 'circle') {
        item.innerText = '0';
      }
      counter++;

      who(console.log('hi'));
      circleWin();
      kresticWin();
      noWin();
    }
  });
});

//создаем массив где прописываем победные комбинации
let win = [
  [0, 1, 2],
  [0, 4, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

// создаем функцию которая проверяет на победу круга

let circleWin = () => {
  for (let i = 0; i < win.length; i++) {
    // проверяем через наш массив с победными комбинациями
    if (
      blockItem[win[i][0]].classList.contains('circle') &&
      blockItem[win[i][1]].classList.contains('circle') &&
      blockItem[win[i][2]].classList.contains('circle')
    ) {
      blockItem[win[i][0]].classList.add('winColor');
      blockItem[win[i][1]].classList.add('winColor');
      blockItem[win[i][2]].classList.add('winColor');

      winner = 'Нули';
      endGame(winner);
      return 1;
    }
  }
};

let kresticWin = () => {
  for (let i = 0; i < win.length; i++) {
    // проверяем через наш массив с победными комбинациями
    if (
      blockItem[win[i][0]].classList.contains('krestic') &&
      blockItem[win[i][1]].classList.contains('krestic') &&
      blockItem[win[i][2]].classList.contains('krestic')
    ) {
      blockItem[win[i][0]].classList.add('winColor');
      blockItem[win[i][1]].classList.add('winColor');
      blockItem[win[i][2]].classList.add('winColor');

      winner = 'Крестики';
      endGame(winner);
      return 1;
    }
  }
};

let noWin = () => {
  if (!kresticWin() && !circleWin() && counter >= 9) {
    winner = 'Ничья';
    endGame(winner);
  }
};

let blockWinner = document.getElementById('blockWinner');
let spanWinner = document.getElementById('spanWinner');
let btnNewGame = document.getElementById('btnNewGame');
let blockArea = document.getElementById('blockArea');

let endGame = (winner) => {
  blockArea.style.pointerEvents = 'none';
  blockWinner.style.display = 'flex';
  spanWinner.innerText = winner;
};

btnNewGame.addEventListener('click', () => {
  document.location.reload();
});
