function showTemperature(response) {
  h1.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
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
  fahrenheitLink.innerHTML = `<strong>°F</strong>`;
  celsiusLink.innerHTML = `°C`;
}

function convertToCelsius() {
  fahrenheitLink.innerHTML = `°F`;
  celsiusLink.innerHTML = `<strong>°C</strong>`;
}

let apiKey = "b141c9b5edc44b9a871e4ebe5549ac92";
let unit = "imperial";
let h1 = document.querySelector("h1");

let citySelector = document.querySelector("#city-searchbar");
citySelector.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector(".current-location");
currentLocationButton.addEventListener("click", showCurrentLocationInfo);

let temperature = document.querySelector("#temperature");

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
