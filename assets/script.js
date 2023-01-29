var userFormEl = document.querySelector('#user-form')
var searchInputEl = document.querySelector('#cityname')

//Create function to show city weather
var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityname = searchInputEl.value.trim();

    if (cityname) {
        getCityWeather(cityname);

        //   repoContainerEl.textContent = '';
        searchInputEl.value = '';
    } else {
        alert('Please enter a GitHub username');
    }
};

//convert city name to geo 
const APIkey = "4bd965c6c0afa77d9913f9da90fbbf25"
var getCityGeo = function (City) {
    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + City + '&limit=5&appid=' + APIkey

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayRepos(data, user);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to find, please re-enter');
        });
};

//fetch city weawther information 
var getCityWeather = function (City) {
    var apiUrl = 'https://api.github.com/users/' + City + '/repos';

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayRepos(data, user);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to GitHub');
        });
};

userFormEl.addEventListener('submit', formSubmitHandler);