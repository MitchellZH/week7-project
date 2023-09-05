const formEl = document.querySelector("form");
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityOrZip = formEl[0].value;
  weather(cityOrZip);
});
const bodybg = document.querySelector("body");

const weather = async (name) => {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=1fb3147c2df21cf461f2579d644dd0c0`);
    const data = await response.json();
    const response2 = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=1fb3147c2df21cf461f2579d644dd0c0`);
    const data2 = await response2.json();
    const currentTemp = (data.main.temp - 273.15)* 9/5 + 32;
    const highTemp = (data.main.temp_max - 273.15) * 9/5 + 32;
    const lowTemp = (data.main.temp_min - 273.15) * 9/5 + 32;
    const humidity = data.main.humidity;
    

    switch (data.weather[0].description) {
      case "clear sky":
        bodybg.setAttribute("class", "clear");
        break;
      case "few clouds":
        bodybg.setAttribute("class", "fewclouds");
        break;
      case "scattered clouds":
        bodybg.setAttribute("class", "scattered");
        break;
      case "broken clouds":
        bodybg.setAttribute("class", "broken");
        break;
      case "shower rain":
        bodybg.setAttribute("class", "shower");
        break;
      case "rain":
        bodybg.setAttribute("class", "rain");
        break;
      case "thunderstorm":
        bodybg.setAttribute("class", "thunder");
        break;
      case "snow":
        bodybg.setAttribute("class", "snow");
        break;
      case "mist":
        bodybg.setAttribute("class", "mist");
        break;
    }

    const weatherOutput = document.querySelector('#output');
    weatherOutput.setAttribute("class", "boxShadow");
    weatherOutput.innerHTML = `
      <div class="card-body p-4">
        <h4 class="mb-1 sfw-normal">${data2[0]["name"]}, ${
      data2[0]["state"]
    }</h4>
        <p class="mb-2">Current temperature: <strong>${currentTemp.toFixed(
          2
        )}°F</strong></p>
        <p class="mb-2">Humidity: <strong>${humidity}%</strong></p>
        <p>Max: <strong>${highTemp.toFixed(
          2
        )}°F</strong>, Min: <strong>${lowTemp.toFixed(2)}°F</strong></p>
        <div class="d-flex flex-row align-items-center">
          <p class="mb-0 me-4">Looks like ${
            data.weather[0].description
          } at the moment.</p>
          <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${
            data.weather[0].description
          }">
        </div>
      </div>
    `;
}