const API_KEY = "your_api_key_here"; // replace with your API key
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=`;

const form = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const weatherContainer = document.querySelector("#weather-container");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value;
  searchWeather(searchTerm);
});

async function searchWeather(searchTerm) {
  try {
    const response = await fetch(BASE_URL + searchTerm);
    if (!response.ok) {
      throw new Error("City not found.");
    }
    const data = await response.json();
    const weather = {
      city: data.name,
      country: data.sys.country,
      description: data.weather[0].description,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: data.weather[0].icon,
    };
    displayWeather(weather);
  } catch (error) {
    console.log(error);
    weatherContainer.innerHTML = `<p class="error-message">${error.message}</p>`;
  }
}

function displayWeather(weather) {
  weatherContainer.innerHTML = `
    <div class="weather-card">
      <div class="weather-icon">
        <img src="http://openweathermap.org/img/w/${weather.icon}.png" alt="${weather.description}">
      </div>
      <div class="weather-details">
        <h2 class="city">${weather.city}, ${weather.country}</h2>
        <p class="temperature">${weather.temperature.toFixed(1)} &deg;C</p>
        <p class="description">${weather.description}</p>
        <p class="feels-like">Feels like ${weather.feelsLike.toFixed(1)} &deg;C</p>
        <p class="humidity">Humidity: ${weather.humidity}%</p>
        <p class="wind-speed">Wind speed: ${weather.windSpeed} km/h</p>
      </div>
    </div>
  `;
}
