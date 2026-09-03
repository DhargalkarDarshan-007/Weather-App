// const weaterapi = "5b4cf0ca8efc2737c9b5471e36833864"
// // const seacrhcity = document.getElementsBy("searchcity");
// const seacrhcity=document.getElementsByClassName("city")
// async function getdata() {
//     let input=seacrhcity.value;
//     console.log(input);
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${weaterapi}`;
//     const response = await fetch(url);
//     const data = await response.json();
//     let temp = ( data.main.temp - 273.15)
//     console.log(temp);
//     document.getElementById("show").innerText = temp.toFixed(2) + "°C";
//     document.getElementById("city").innerText=data.name;
// }


const weatherApi = "5b4cf0ca8efc2737c9b5471e36833864";

const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".tem");
const cityName = document.querySelector(".city");
const humidity = document.querySelector(".humidity p");
const wind = document.querySelector(".wind p");

async function getWeather(city) {

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // Temperature
        const temp = data.main.temp - 273.15;

        temperature.innerText = temp.toFixed(0) + "°C";

        // City
        cityName.innerText = data.name;

        // Humidity
        humidity.innerText = data.main.humidity + "%";

        // Wind speed
        wind.innerText = data.wind.speed + " km/h";

        // Weather condition
        const weather = data.weather[0].main;

        if (weather === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        }
        else if (weather === "Clear") {
            weatherIcon.src = "images/clear.png";
        }
        else if (weather === "Rain") {
            weatherIcon.src = "images/rain.png";
        }
        else if (weather === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        }
        else if (weather === "Mist") {
            weatherIcon.src = "images/mist.png";
        }
        else if (weather === "Snow") {
            weatherIcon.src = "images/snow.png";
        }
        else {
            weatherIcon.src = "images/rain.png";
        }

    } catch (error) {
        alert("City not found. Please enter a valid city.");
        console.log(error);
    }
}

// Search button
searchButton.addEventListener("click", () => {
    getWeather(searchInput.value);
});

// Press Enter to search
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getWeather(searchInput.value);
    }
});