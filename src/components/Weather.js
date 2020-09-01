import React, { useState, useEffect } from 'react';
import Homepage from './Homepage';
import Error from './Error';

function Weather() {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const [localweather, setLocalweather] = useState({});
    const [query, setQuery] = useState("");
    const [newtemp, setNewtemp] = useState(true);
    const [unit, setUnit] = useState("°C");

    //geolocation to get the local weather
    const getLonLat = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lon = position.coords.longitude;
                const lat = position.coords.latitude;
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
                    .then(response => response.json())
                    .then(result => {
                        setLocalweather(result)
                        return;
                    })
                    .catch(err => console.log(err));
            })
        }
    }

    useEffect(() => {
        getLonLat();
    }, [])

    //give input to get other location weather
    const searchInput = (e) => {
        e.preventDefault()
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`)
            .then(response => response.json())
            .then(result => {
                setLocalweather(result)
                setQuery("")
            })
            .catch(err => console.log(err));
    }

    const oppositeUnit = unit === "°C" ? "°F" : "°C";

    const convert = () => {
        if (unit === "°C") {
            setNewtemp(false)
            setUnit(oppositeUnit);
        }

        if (unit === "°F") {
            setNewtemp(true)
            setUnit(oppositeUnit);
        }
    };
    return (
        <div>
            {
                !localweather.weather ? 
                <Error /> :
                <Homepage
                    localweather={localweather}
                    getLonLat={getLonLat}
                    searchInput={searchInput}
                    setQuery={setQuery}
                    convert={convert}
                    oppositeUnit={oppositeUnit}
                    newtemp={newtemp}
                    unit={unit}
                />
            }
        </div>
    )

}
export default Weather;
