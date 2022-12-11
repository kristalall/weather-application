function getForecast(coordinates) {
  let apiKey = "b141c9b5edc44b9a871e4ebe5549ac92";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  h1.innerHTML = response.data.name;
  fahrenheitTemperature = response.data.main.temp;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${unit}&appid=${apiKey}`;
  axios.get(currentApiUrl).then(showTemperature);
}

function showCurrentLocationInfo() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function convertToFahrenheit() {
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius() {
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperature.innerHTML = Math.round(celsiusTemperature);
}

function displayForecast(response) {
  console.log(response);
  let forecastElement = document.querySelector("#forecast");
  forecastHTML = `<div class = "row">`;
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col forecast-by-day"><div class="forecast-date">${day}</div><img
            src="http://openweathermap.org/img/wn/50d@2x.png"
            alt=""
            width="46"
          /><div class="forecast-temperature">84°</div></div>
       `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let apiKey = "b141c9b5edc44b9a871e4ebe5549ac92";
let unit = "imperial";
let h1 = document.querySelector("h1");

let citySelector = document.querySelector("#city-searchbar");
citySelector.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector(".current-location");
currentLocationButton.addEventListener("click", showCurrentLocationInfo);

let temperature = document.querySelector("#temperature");

let fahrenheitTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let time = `${hour}:${minutes}`;
let currentDate = document.querySelector("#current-day-time");
currentDate.innerHTML = `${day} <br /> ${time}`;

search("Houston");
