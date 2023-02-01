var userFormEl = document.querySelector('#user-form')
var searchInputEl = document.querySelector('#cityname')
const previouSearch = JSON.parse(localStorage.getItem("city")) || []
//Create function to show city weather
var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityname = searchInputEl.value.trim();

    if (cityname) {
        // showCityWeather(cityname);
        // const previouSearch = JSON.parse(localStorage.getItem("city"))||[]
        previouSearch.push(cityname)
        localStorage.setItem("city", JSON.stringify(previouSearch))
        // console.log(previouSearch)
        displayCities()
        getCityGeo(cityname);

        //   repoContainerEl.textContent = '';
        searchInputEl.value = '';
    } else {
        alert('Please enter a GitHub username');
    }
};

function displayCities() {
    const historyEL = document.querySelector("#previouscity")
    historyEL.innerHTML = ""

    for (var i = 0; i < previouSearch.length; i++) {
        const cityEl = document.createElement("button")
        cityEl.textContent = previouSearch[i]
        cityEl.addEventListener("click", function (event) {
            var cityname = event.target.textContent
            getCityGeo(cityname)

        })
        historyEL.appendChild(cityEl)
    }

}
displayCities();

userFormEl.addEventListener('submit', formSubmitHandler);

//convert city name to Geo lat and lon
const APIkey = "4bd965c6c0afa77d9913f9da90fbbf25"

var getCityGeo = function (City) {
    var apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + City + '&limit=5&appid=' + APIkey

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            lat = data[0].lat
            lon = data[0].lon
            showCityWeather(lat, lon)
            FiveDayForecast(lat, lon)
        });

};

//fetch city weawther information 
var showCityWeather = function (lat, lon) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + APIkey

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const { name } = data;
            console.log(data)
            const { icon, description } = data.weather[0];
            const { temp, humidity } = data.main;
            const { speed } = data.wind;
            console.log(name, icon, description, temp, humidity, speed)
        })

}

var FiveDayForecast = function (lat, lon) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIkey + "&units=metric"

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {

            const fivedayEl = document.querySelector("#fivedayforcast")
            fivedayEl.innerHTML = ""

            for (var i = 0; i < data.list.length; i += 8) {

                const weather = data.list[i]
                const { name } = weather;
                // console.log(weather)

                const cardEl = document.createElement("div")
                cardEl.classList.add("card")

                const tempEl = document.createElement("p")
                tempEl.textContent = "temperature: " + weather.main.temp//Math.round

                const humidityEl = document.createElement("p")
                humidityEl.textContent = "humidity:" + weather.main.humidity
                // console.log(humidityEl)

                const iconEl = document.createElement("img")
                iconEl.textContent = 'http://openweathermap.org/img/wn/'+ weather.weather.icon + '@2x.png'
                console.log(weather.weather.icon)

                cardEl.appendChild(tempEl)
                cardEl.appendChild(humidityEl)
                cardEl.appendChild(iconEl)
                fivedayEl.appendChild(cardEl)

            }

            // const { icon, description } = data.weather;
            // const { temp, humidity } = data.main;
            // const { speed } = data.wind;
            // console.log(data, data.weather, data.main, data.wind)
        })

}






