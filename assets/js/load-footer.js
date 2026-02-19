const city = 'St. Petersburg,US';
const apiKey = '671277334815afdc86042e04b061da17';

fetch('footer.html')
  .then((response) => response.text())
  .then((data) => {
    document.getElementById('footer-placeholder').innerHTML = data;

    const oneDayCard = document.getElementById('oneDayCardEl');
    const fiveDayCards = document.getElementById('fiveDayCardsEl');

    getWeather(oneDayCard, fiveDayCards);
  })
  .catch((error) => console.error('Error loading footer:', error));

function getWeather(oneDayCard, fiveDayCards) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.list) {
        console.error('Weather API error:', data);
        return;
      }

      const current = data.list[0];
      if (!current || !current.weather) {
        console.error('Unexpected weather structure:', data);
        return;
      }

      createCurrentCard(current, oneDayCard);

      const daily = data.list.filter((item) => item.dt_txt.includes('15:00:00'));
      createFiveDayCards(daily.slice(0, 7), fiveDayCards);
    })
    .catch((error) => console.error('Weather fetch error:', error));
}

function createCurrentCard(current, container) {
  container.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png">
    <ul>
      <li><strong>${Math.round(current.main.temp)}°F</strong></li>
      <li>${current.weather[0].description}</li>
      <li>Humidity: ${current.main.humidity}%</li>
      <li>Wind: ${Math.round(current.wind.speed)} mph</li>
    </ul>
  `;
}

function createFiveDayCards(days, container) {
  container.innerHTML = '';

  days.forEach((day) => {
    const date = new Date(day.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

    const card = document.createElement('div');
    card.classList.add('fiveDayCard');

    card.innerHTML = `
      <h3>${dayName}</h3>
      <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">
      <p>${Math.round(day.main.temp)}°F</p>
      <p>Wind: ${Math.round(day.wind.speed)} mph</p>
    `;

    container.appendChild(card);
  });
}
