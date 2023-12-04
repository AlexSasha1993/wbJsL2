// Получаем ссылки на элементы DOM
const generateMemeBtn = document.querySelector(
  '.meme-generator .generate-meme-btn'
);
const memeImage = document.querySelector('.meme-generator img');
const memeTitle = document.querySelector('.meme-generator .meme-title');
const downloadMemeBtn = document.getElementById('download-meme-btn');

// Функция для обновления деталей мема на странице
const updateDetails = (url, title) => {
  memeImage.setAttribute('src', url);
  memeTitle.innerHTML = title;
};

// Функция для генерации мема
const generateMeme = () => {
  // Устанавливаем таймер на 5 секунд
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Не удалось загрузить мем. Пожалуйста, включите VPN.'));
    }, 2000);
  });

  // Отправляем запрос на API для получения данных о меме
  const memePromise = fetch('https://meme-api.com/gimme/wholesomememes').then(
    (response) => {
      // Проверяем, успешен ли запрос (статус 200)
      if (!response.ok) {
        throw new Error('Не удалось загрузить мем. Пожалуйста, включите VPN.');
      }
      return response.json();
    }
  );

  // Используем Promise.race для выполнения первого завершившегося промиса
  Promise.race([memePromise, timeoutPromise])
    .then((data) => {
      // Обновляем детали мема на странице с использованием полученных данных
      // Promise.race ожидает массив промисов в качестве аргумента. Promise.race запускает обработку промиса, когда первый из переданных ему промисов завершается (возвращает результат или вызывает ошибку).
      updateDetails(data.url, data.title);
    })
    .catch((error) => {
      // В случае ошибки, выводим сообщение на экран
      console.error(error.message);
      alert(error.message); // Вы также можете использовать другие способы уведомления пользователя
    });
};

// Функция для скачивания мема
const downloadMeme = () => {
  // Получаем URL изображения мема
  const memeUrl = memeImage.getAttribute('src');

  // Создаем элемент <a> для скачивания
  const downloadLink = document.createElement('a');
  downloadLink.href = memeUrl;
  downloadLink.download = 'meme.jpg';

  // Создаем и эмулируем клик по элементу <a>
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

// Добавляем обработчик события для кнопки генерации мема
generateMemeBtn.addEventListener('click', generateMeme);

// Добавляем обработчик события для кнопки скачивания мема
downloadMemeBtn.addEventListener('click', downloadMeme);

// Вызываем функцию генерации мема при загрузке страницы
generateMeme();
