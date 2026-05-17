const city = "St. Petersburg,US";
const apiKey = "671277334815afdc86042e04b061da17";

fetch("/pages/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer-placeholder").innerHTML = data;
    document.getElementById("year").textContent = new Date().getFullYear();

    const currentWeather = document.getElementById("currentWeatherEl");

    getWeather(currentWeather);
  })
  .catch((error) => console.error("Error loading footer:", error));

function getWeather(currentWeather) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`,
  )
    .then((response) => response.json())
    .then((data) => {
      if (!data.list) {
        console.error("Weather API error:", data);
        return;
      }

      const current = data.list[0];
      if (!current || !current.weather) {
        console.error("Unexpected weather structure:", data);
        return;
      }

      createCurrentWeather(current, currentWeather);
    })
    .catch((error) => console.error("Weather fetch error:", error));
}

function createCurrentWeather(current, container) {
  const date = new Date(current.dt * 1000);
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

  container.innerHTML = `
    <p>Current Conditions: <img src="../assets/images/openweather-icons/${current.weather[0].icon}@2x.png"> ${Math.round(current.main.temp)}°F, ${current.weather[0].description}, ${Math.round(current.wind.speed)} mph winds<p>
  `;
}
