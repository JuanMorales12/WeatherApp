
const apiKey = "e8d49f94b664a097b423667e2230e9ee";

const weatherDataEl = document.getElementById("weather-data");
const inputCity = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    const cityValue = inputCity.value;
    getWeatherData(cityValue);
})

async function getWeatherData(cityValue){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
        if(!response.ok)
            throw new Error("Network response was not okay");
        const data = await response.json();
        const {feels_like,humidity} = data.main;
        const {wind} = data;
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        const details = [
            `Feels like: ${Math.round(feels_like)}°C`,
            `Humidity: ${humidity}%`,
            `Wind speed: ${wind.speed} m/s`
        ]

        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        
        weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;
        weatherDataEl.querySelector(".description").textContent = description;
        weatherDataEl.querySelector(".details").innerHTML = details.map(detail => `<div>${detail}</div>`).join("");

    }catch(error){
        weatherDataEl.querySelector(".icon").innerHTML = "";
        weatherDataEl.querySelector(".temperature").textContent = "";
        weatherDataEl.querySelector(".description").textContent = "An Error happened, please try again later.";
        weatherDataEl.querySelector(".details").innerHTML = "";
    }
}