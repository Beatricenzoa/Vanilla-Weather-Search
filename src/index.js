function showWeatherDetails(response) {
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `${response.data.wind.speed}km/h`;

  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = `${temperature}`;

  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}">`;

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
  showForecast(response.data.city);
}
function searchCity(city) {
  let key = "0f8t20affd39ebb0d8d3f0o83cf0b40f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=metric`;

  axios.get(apiUrl).then(showWeatherDetails);
}
function showForecast(city) {
  let key = "0f8t20affd39ebb0d8d3f0o83cf0b40f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${key}&units=metric`;

  axios.get(apiUrl).then(weatherForecast);
}

function formatedDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[date.getDay()];
}

function weatherForecast(response) {
  let forecastElement = document.querySelector("#weather-forecast");
  let forecast = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecast =
        forecast +
        `
      <div class="weather-forecast">
  <div class="forecast-date">${formatedDay(day.time)}</div>
    <div class="forecast-icon"><img src="${day.condition.icon_url}">
    </div>
  <div class="forecast-temperatures"><span class="max-temperature"><strong>${Math.round(
    day.temperature.maximum
  )}° </strong></span>
  <span class="min-temperature"><strong> ${Math.round(
    day.temperature.minimum
  )}°</strong></span>
  </div> 
  </div>`;
    }
  });
  forecastElement.innerHTML = forecast;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");

  searchCity(searchInputElement.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function formatDate(date) {
  let day = date.getDay();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[day];
  return `${currentDay} ${hours}:${minutes}`;
}
let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateELement.innerHTML = formatDate(currentDate);

searchCity("Nairobi");
