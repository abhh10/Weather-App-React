import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from './assets/search.png'
import clear_icon from './assets/clear.png'
import cloud_icon from './assets/cloud.png'
import humidity_icon from './assets/humidity.png'
import rain_icon from './assets/rain.png'
import snow_icon from './assets/snow.png'
import wind_icon from './assets/wind.png'
import drizzle_icon from './assets/drizzle.png'


const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);
    

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon
    };
    
    const search = async (city) => {
        if(city === "") {
            alert("Enter a city");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity : data.main.humidity,
                windSpeed : data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location : data.name,
                icon: icon,
            })
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        search("Milan");
    }, []);

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input ref={inputRef} type='text' placeholder='search'></input>
        <img src={search_icon} alt='search icon' onClick={()=>search(inputRef.current.value)}></img>
      </div>
      <img src ={weatherData.icon} alt='clear' className='weather-icon' ></img>
      <p className="temperature">{weatherData.temperature}&deg;C</p>
      <p className='location' >{weatherData.location}</p>
      <div className='weather-data'>
        <div className='col'>
            <img src = {humidity_icon}></img>
            <div className='humidity'>
                <p>{weatherData.humidity}%</p>
                <span>humidity</span>
            </div>
        </div>
        <div className='col'>
            <img src = {wind_icon}></img>
            <div className='wind speed'>
                <p>{weatherData.windSpeed}</p>
                <span>wind speed</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
