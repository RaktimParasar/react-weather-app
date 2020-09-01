import React, { useState, useEffect } from 'react';
import { FiMapPin, FiSun, FiCloud, FiUmbrella, FiCloudSnow, FiWind, FiSunset, FiFeather } from "react-icons/fi";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Moment from 'react-moment';
import Loading from './Loading';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        backgroundColor: 'transparent',
        boxShadow: 'none'

    },
}));

function Homepage(props) {
    const date = new Date();
    const [isloading, setIsloading] = useState(true)

    useEffect(() => {
        setTimeout(() => setIsloading(false), 200)
    }, [])
    const classes = useStyles();

    const { name } = props.localweather;

    return (
        isloading ? <Loading /> :
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper} >
                            <form onSubmit={props.searchInput}>
                                <input className="search-box" type="text" placeholder="Check other location" onChange={e => props.setQuery(e.target.value)} value={props.query} />
                                <button className="search-button">Search</button>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper} style={{ textAlign: "left" }}>
                            <div className={"weather " + (
                                props.localweather.weather && props.localweather.weather[0].main === 'Mist' ? 'weather-mist' :
                                    props.localweather.weather && props.localweather.weather[0].main === 'Rain' ? 'weather-rain' :
                                        props.localweather.weather && props.localweather.weather[0].main === 'Haze' ? 'weather-haze' :
                                            props.localweather.weather && props.localweather.weather[0].main === 'Clear' ? 'weather-clear' :
                                                props.localweather.weather && props.localweather.weather[0].main === 'Sunny' ? 'weather-sunny' :
                                                    props.localweather.weather && props.localweather.weather[0].main === 'Snow' ? 'weather-snow' :
                                                        'weather-clouds'
                            )}>
                                <div className="date-container">
                                    <h3 className="dayname"><Moment format="dddd">{date}</Moment></h3>
                                    <span className="day-date"><Moment format="ll">{date}</Moment></span>
                                    <span className="location"><FiMapPin className="map-pin" />{name}, {props.localweather.sys && props.localweather.sys.country}</span>
                                </div>
                                <div className="weather-container">

                                    {
                                        props.localweather.weather && props.localweather.weather[0].main === 'Mist' ?
                                        <FiWind className="weather-icon" /> :
                                        props.localweather.weather && props.localweather.weather[0].main === 'Rain' ?
                                            <FiUmbrella className="weather-icon" /> :
                                            props.localweather.weather && props.localweather.weather[0].main === 'Haze' ?
                                                <FiSunset className="weather-icon" /> :
                                                props.localweather.weather && props.localweather.weather[0].main === 'Clear' ?
                                                    <FiFeather className="weather-icon" /> :
                                                    props.localweather.weather && props.localweather.weather[0].main === 'Sunny' ?
                                                        <FiSun className="weather-icon" /> :
                                                        props.localweather.weather && props.localweather.weather[0].main === 'Snow' ? <FiCloudSnow className="weather-icon" /> :
                                                            <FiCloud className="weather-icon" />
                                                        }

                                    <h1 className="weather-temp" onClick={props.convert}>
                                        {props.newtemp === true ? (Math.round(props.localweather.main && props.localweather.main.temp)) :
                                            (Math.round(props.localweather && props.localweather.main.temp * 9 / 5) + 32)}
                                        {props.unit}
                                    </h1>
                                    <span className="feels">
                                        Feels like {props.newtemp === true ? (Math.round(props.localweather.main && props.localweather.main.feels_like)) :
                                            (Math.round(props.localweather.main && props.localweather.main.feels_like * 9 / 5) + 32)}
                                        {props.unit}</span>
                                    <h3 className="weather-desc">{props.localweather.weather && props.localweather.weather[0].main}</h3>
                                </div>
                            </div>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper} style={{ textAlign: "left", marginRight: 25 }}>
                            <div className="today-info">
                                <div className="precipitation">
                                    <span className="title">PRESSURE</span>
                                    <span className="value">{props.localweather.main && props.localweather.main.pressure} mbar</span>
                                </div>
                                <div className="humidity">
                                    <span className="title">HUMIDITY</span>
                                    <span className="value">{props.localweather.main && props.localweather.main.humidity} %</span>
                                </div>
                                <div className="wind">
                                    <span className="title">WIND</span>
                                    <span className="value">{props.localweather.wind && props.localweather.wind.speed} km/h</span>
                                </div>
                                <div className="longitude">
                                    <span className="title">LONGITUDE</span>
                                    <span className="value">{props.localweather.coord && props.localweather.coord.lon}°</span>
                                </div>
                                <div className="latitude">
                                    <span className="title">LATITUDE</span>
                                    <span className="value">{props.localweather.coord && props.localweather.coord.lat}°</span>
                                </div>
                                <div className="min-temp">
                                    <span className="title">MIN TEMP</span>
                                    <span className="value">
                                        {props.newtemp === true ? (Math.round(props.localweather.main && props.localweather.main.temp_min)) :
                                            (Math.round(props.localweather.main && props.localweather.main.temp_min * 9 / 5) + 32)} {props.unit
                                        }
                                    </span>
                                </div>
                                <div className="max-temp">
                                    <span className="title">MAX TEMP</span>
                                    <span className="value">
                                        {props.newtemp === true ? (Math.round(props.localweather.main && props.localweather.main.temp_max)) :
                                            (Math.round(props.localweather.main && props.localweather.main.temp_max * 9 / 5) + 32)} {props.unit
                                        }
                                    </span>
                                </div>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
    )
}

export default Homepage;
