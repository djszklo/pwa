const input = document.querySelector('input');
const button = document.querySelector('button');
const errprMsg = document.querySelector('p.error_message');
const cityName = document.querySelector('h2.city_name');
const weatherimg = document.querySelector('img.weather_img');
const temp = document.querySelector('p.temp');
const description = document.querySelector('p.description');
const humidity = document.querySelector('span.humidity');
const wind = document.querySelector('span.wind_speed');
const pressure = document.querySelector('span.pressure');
const feelsLike = document.querySelector('span.feels_like');
const visibility = document.querySelector('span.visibility');
const clouds = document.querySelector('span.cloudiness');
const pollutionImg = document.querySelector('img.air_quality_img');
const pollutionValue = document.querySelector('span.pollution_value');

const apiInfo = {
    _KEY: '&appid=ea10c65dbc180cd858444267828bbd69',
    link: 'https://api.openweathermap.org/data/2.5/weather?q=',
    units: '&units=metric',
    lang: '&lang=pl'
};

function getWeatherInfo(){
    const city = input.value.trim();
    const URL = `${apiInfo.link}${city}${apiInfo._KEY}${apiInfo.units}${apiInfo.lang}`;

    axios.get(URL).then((res)=>{
        cityName.textContent = `${res.data.name}, ${res.data.sys.country}`;
        temp.textContent = `${Math.round(res.data.main.temp)}`; 
        description.textContent = `${res.data.weather[0].description}`;
        humidity.textContent = `${res.data.main.humidity}`;
        wind.textContent = `${Math.round(res.data.wind.speed) * 3.6}`;
        pressure.textContent =  `${res.data.main.pressure}`;
        feelsLike.textContent = `${Math.round(res.data.main.feels_like)}`;
        visibility.textContent = `${res.data.visibility}`;
        clouds.textContent = `${res.data.clouds.all}`;
        wind.textContent = `${res.data.wind.speed}`;
        weatherimg.src = `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`;
        errprMsg.textContent="";

        const url_pollution = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${res.data.coord.lat}&lon=${res.data.coord.lon}${apiInfo._KEY}`;
        axios.get(url_pollution).then((res_pollution)=>{
            pollutionValue.textContent = `${res_pollution.data.list[0].components.pm2_5}`;
            const pollutionValueNumber = res_pollution.data.list[0].components.pm2_5;
            if(pollutionValueNumber<10){
                pollutionImg.style.backgroundColor = 'green';
            } else if(pollutionValueNumber<25){
                pollutionImg.style.backgroundColor = 'yellowgreen';
            } else if(pollutionValueNumber<50){
                pollutionImg.style.backgroundColor = 'yellow';
            } else if (pollutionValueNumber<75){
                pollutionImg.style.backgroundColor = 'orange';
            } else {
                pollutionImg.style.backgroundColor = 'red';
            }
        })

    }).catch((error)=>{
        // console.log(error)
        errprMsg.textContent = `${error.response.data.message}`;
        [cityName, temp, description, humidity, wind, pressure, feelsLike, visibility, clouds].forEach(el=>{el.textContent=''})
        weatherimg.src='';
        pollutionImg.style.backgroundColor = 'transparent'

    }).finally(()=>{
        input.value = '';
    });
}

function getWeatherInfoByEnter(e){
    if (e.key === 'Enter') {
        getWeatherInfo();
    }
}

button.addEventListener('click', getWeatherInfo);
input.addEventListener('keypress', getWeatherInfoByEnter);