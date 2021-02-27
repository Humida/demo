// bien toan cuc
window.a = false;

const main = document.getElementById("main");
const inputUser = document.getElementById("main_input");
const submit = document.getElementById("main_submit")
const showSearch = document.getElementById("showSearchElement");
const container = document.getElementById("container");

let render = function(data) {
    console.log(data);
    let temperature = Math.round(data.main.temp - 273);
    let fellLike = Math.round(data.main.feels_like - 273);
    let description = data.weather[0].description;
    let idIconCloud = data.weather[0].icon;
    let country = data.sys.country;
    let cityName = data.name;
    let windSpeed = data.wind.speed;
    let urlIconCloud = `http://openweathermap.org/img/w/${idIconCloud}.png`;

    let showSearchNode = `
        <div class="showSearch_header">
                <div class="showSearch_header-main">
                    <div class="showSearch_header-location">Location: ${cityName},${country}</div>
                    <div class="showSearch-header-temperature">${temperature}°C</div>
                </div>

                <div class="showSearch_header-cloud">
                    <div class="cloud_icon">
                        <img src="http://openweathermap.org/img/w/${idIconCloud}.png">
                    </div>
                    <div class="cloud_description">${description}</div>
                </div>
            </div>

            <div class="showSearch_main">
                <div class="showSearch_main-item temperature">Temperature: ${temperature}°C</div>
                <div class="showSearch_main-item perrsure">Wind speed: ${windSpeed}m/s</div>
                <div class="showSearch_main-items humidity">Fells like: ${fellLike}°C</div>
            </div>
        </div>
    `

    if (window.a === true) {
        let node = document.createElement("div");
        node.innerHTML = showSearchNode;
        container.appendChild(node);
    } else {
        showSearch.innerHTML = showSearchNode;
    }

    showSearch.style.display = "block";
    showSearch.style.position = "relative";
    if (temperature >= 20) {
        showSearch.style.background = "rgb(219, 183, 64)";
        showSearch.style.fontWeight = 900;
    }

    window.a = true;

}

let dataWeather = function() {
    let cityName = inputUser.value;
    let myKey = "a60eef593dbdd3060f102c8f163ad008";
    let myApi = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${myKey}`;

    fetch(myApi)
        .then(function resolve(respon) {
            return respon.json();
        })
        .then(function processData(data) {
            render(data);
        })
        .catch(function error(err) {
            console.error(err);
        })

};
submit.addEventListener("click", dataWeather);

inputUser.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        console.log(e.key);
        dataWeather();
    }
})