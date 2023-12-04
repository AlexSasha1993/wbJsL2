// Получаем элементы из DOM
const productList = document.getElementById('productList');
const chartCanvas = document.getElementById('caloriesChart');
const targetCalories = document.getElementById('targetValue');
const warning = document.getElementById('warning');

// Инициализируем данные из localStorage или устанавливаем значения по умолчанию
let products = JSON.parse(localStorage.getItem('products')) || [];
let totalCalories = 0;
let targetValue = parseInt(localStorage.getItem('targetCalories')) || 2000;

// Вызываем функции для обновления интерфейса
updateProductList();
updateTotalCalories();
updateTargetCalories();
updateCaloriesChart();

// Функция добавления продукта
function addProduct() {
  const productName = document.getElementById('productName').value;
  const calories = parseInt(document.getElementById('calories').value);

  if (productName && !isNaN(calories) && calories > 0) {
    // Добавляем продукт в массив
    products.push({ name: productName, calories: calories });
    // Сохраняем массив продуктов в localStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Вызываем функции для обновления интерфейса
    updateProductList();
    updateTotalCalories();
    updateTargetCalories();
    updateCaloriesChart();
    checkDailyLimit();
  } else {
    alert('Введите корректные данные для продукта.');
  }
}

// Функция обновления списка продуктов
function updateProductList() {
  productList.innerHTML = '';
  products.forEach((product) => {
    const li = document.createElement('li');
    li.textContent = `${product.name} - ${product.calories} калорий`;
    productList.appendChild(li);
  });
}

// Функция фильтрации продуктов по названию
function filterProducts() {
  const filterValue = document.getElementById('filter').value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filterValue)
  );
  updateProductList(filteredProducts);
}

// Функция сортировки продуктов по калорийности
function sortProducts() {
  products.sort((a, b) => a.calories - b.calories);
  updateProductList();
}

// Функция обновления общей суммы съеденных калорий
function updateTotalCalories() {
  totalCalories = products.reduce((sum, product) => sum + product.calories, 0);
  document.getElementById(
    'totalCalories'
  ).textContent = `Съедено калорий: ${totalCalories}`;
  checkDailyLimit();
}

// Функция обновления целевых калорий
function updateTargetCalories() {
  targetCalories.textContent = `Цель калорий: ${targetValue}`;
}

// Функция очистки всех данных
function clearAll() {
  // Удаляем данные из localStorage
  localStorage.removeItem('products');
  localStorage.removeItem('targetCalories');
  // Обнуляем массив продуктов и сумму калорий
  products = [];
  totalCalories = 0;
  // Устанавливаем целевые калории в значение по умолчанию
  targetValue = 2000;
  // Вызываем функции для обновления интерфейса
  updateProductList();
  updateTotalCalories();
  updateTargetCalories();
  updateCaloriesChart();
}

// Функция проверки превышения дневного лимита
function checkDailyLimit() {
  if (totalCalories > targetValue) {
    warning.textContent = 'Превышен дневной лимит калорий!';
  } else {
    warning.textContent = '';
  }
}

// Функция обновления диаграммы калорий
function updateCaloriesChart() {
  // Получаем данные для диаграммы
  const labels = products.map((product) => product.name);
  const data = products.map((product) => product.calories);

  // Настройки данных для диаграммы
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Калории',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: data,
      },
    ],
  };

  // Настройки опций диаграммы
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Получаем контекст canvas
  const ctx = chartCanvas.getContext('2d');

  // Удаляем предыдущую диаграмму, если она существует
  if (chartCanvas.chart) {
    chartCanvas.chart.destroy();
  }

  // Создаем новую диаграмму
  chartCanvas.chart = new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: chartOptions,
  });
}
