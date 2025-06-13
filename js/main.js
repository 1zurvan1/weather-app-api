var cityNameInputEl = document.getElementById("city-input");
var btnEl = document.getElementById("city-input-btn");
var cityNameEl = document.getElementById("city-name");
var dateEl = document.getElementById("date");
var weatherIconEl = document.getElementById("weather-icon");
var tempEl = document.getElementById("temperature");
var desWeatherEl = document.getElementById("description");
var windSpeedEl = document.getElementById("wind-speed");
let loaderDiv = document.querySelector(".loader-div");
var errorEl = document.querySelector(".error");
var weatherInfoDiv = document.querySelector("#weather-info")
const apiKey = "2e9239c6ac4a5edd6d68f0869dc9ce69";

getWeather = async () => {
let getWeatherResult1;
  try { 
       errorEl.textContent = "";
    weatherInfoDiv.classList.remove("none")
    loaderDiv.classList.remove("onload")
    let getWeatherResult = await (
      await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityNameInputEl.value}&limit=1&appid=${apiKey}`)
    ).json();
    let lat = getWeatherResult[0]["lat"];
    let lon = getWeatherResult[0]["lon"];
    getWeatherResult1 = await (
      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    ).json();

  } catch (error) {
    if(error) {
      console.log(error);
      weatherInfoDiv.classList.add("none")
      errorEl.textContent = "Some Thing Wrong Try again";
      cityNameInputEl.value = "";
    }else{
      
      
    }
  } finally {
    loaderDiv.classList.add("onload");



  }

  showWeather(getWeatherResult1)
};
kToc = (e) => {
  let result = +e - 273;
  return result.toFixed(2);
};
showWeather = (GWR) => {
  cityNameEl.innerHTML = `City Name: ${GWR["name"]}`;
  tempEl.innerHTML = `temperature: ${kToc(GWR["main"]["temp"])}`;
  desWeatherEl.innerHTML = `Weather Description: ${GWR["weather"][0]["description"]}`;
  windSpeedEl.innerHTML = `Wind Speed: ${GWR["wind"]["speed"]}`;
  weatherIconEl.setAttribute("src", `http://openweathermap.org/img/wn/${GWR["weather"][0]["icon"]}@2x.png`);
  weatherIconEl.classList.remove("none")

};
btnEl.addEventListener("click", getWeather);
cityNameInputEl.addEventListener("keypress", (e) => {
  if(e.key === "Enter") {
    btnEl.click();
  }
})