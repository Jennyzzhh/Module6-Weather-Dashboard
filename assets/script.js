var userFormEl = document.querySelector('#user-form')
var searchInputEl = document.querySelector('#cityname')
const previouSearch = JSON.parse(localStorage.getItem("city")) || []



//Create function to search city weather
var formSubmitHandler = function (event) {

    event.preventDefault();

    let cityname = searchInputEl.value.trim();


    if (cityname) {

        previouSearch.push(cityname)

        localStorage.setItem("city", JSON.stringify(previouSearch))

        displayCities()

        getCityGeo(cityname);

        searchInputEl.value = '';

    } else {
        alert('Please enter valid city name');
    }
};

//Search History 
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

//clear History
function clearHistory() {
    const clearEL = document.createElement("button")
    clearEL.addEventListener("click",function (event) {
        localStorage.setItem("city","")
    })
}
clearHistory()

userFormEl.addEventListener('submit', formSubmitHandler);

//convert city name to Geo lat and lon
const APIkey = "4bd965c6c0afa77d9913f9da90fbbf25"

var getCityGeo = function (City) {
    var apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + City + '&limit=5&appid=' + APIkey

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)
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
            console.log(data)

            const currentdayEl = document.querySelector("#currentweather")

            const cardEl = document.createElement("div")
            cardEl.classList.add("card")

            let nameEl = document.createElement("h2")
            nameEl.textContent = data.name


            let tempEl = document.createElement("p")
            tempEl.textContent = "temperature: " + data.main.temp + "°C"
            //Math.round 

            const iconEl = document.createElement("img")
            iconURL = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png'
            iconEl.setAttribute("src", iconURL) //icon description in weather.weather

            let humidityEl = document.createElement("p")
            humidityEl.textContent = "humidity: " + data.main.humidity + "%"

            let speedEl = document.createElement("p")
            speedEl.textContent = "Speed: " + data.wind.speed + "MPH"

            cardEl.appendChild(nameEl)
            cardEl.appendChild(tempEl)
            cardEl.appendChild(humidityEl)
            cardEl.appendChild(iconEl)
            cardEl.appendChild(speedEl)
            currentdayEl.appendChild(cardEl)

            // const { name } = data;
            // console.log(data)
            // const { icon, description } = data.weather[0];
            // const { temp, humidity } = data.main;
            // const { speed } = data.wind;
            // console.log(name, icon, description, temp, humidity, speed)
        })

}

var FiveDayForecast = function (lat, lon) {

    // const fiveTitle = document.createElement("h2")
    // fiveTitle.textContent = "Five Day Forecast"

    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIkey + "&units=metric"

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {

            const fivedayEl = document.querySelector("#fivedayforcast")
            fivedayEl.innerHTML = ""

            for (var i = 0; i < data.list.length; i += 8) {

                const weather = data.list[i]
                const { name } = weather;
                console.log(weather)

                const cardEl = document.createElement("div")
                cardEl.classList.add("card")

                const dateEl = document.createElement("p")
                dateEl.textContent = weather.dt_txt
                //Math.round 

                const tempEl = document.createElement("p")
                tempEl.textContent = "temperature: " + weather.main.temp + "°C"
                //Math.round 

                const humidityEl = document.createElement("p")
                humidityEl.textContent = "humidity: " + weather.main.humidity + "%"
                // console.log(humidityEl)

                const iconEl = document.createElement("img")
                iconURL = 'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'
                iconEl.setAttribute("src", iconURL) //icon description in weather.weather


                const speedEl = document.createElement("p")
                speedEl.textContent = "Speed: " + weather.wind.speed + "MPH"


                cardEl.appendChild(dateEl)
                cardEl.appendChild(tempEl)
                cardEl.appendChild(humidityEl)
                cardEl.appendChild(iconEl)
                cardEl.appendChild(speedEl)
                fivedayEl.appendChild(cardEl)

            }

            // const { icon, description } = data.weather;
            // const { temp, humidity } = data.main;
            // const { speed } = data.wind;
            // console.log(data, data.weather, data.main, data.wind)
        })

}



//button - eventlistener - storage to empty array 


