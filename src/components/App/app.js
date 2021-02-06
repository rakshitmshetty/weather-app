import './app.css';
import React, { useEffect, useState } from "react";
import { createMuiTheme, Container, ThemeProvider } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";
import Weather from "../Weather/weather";
import moment from "moment";
import defaultList from '../../defaultList.json';

function App() {
  const [city, setCity] = useState(defaultList[0].name);
  const [error, setError] = useState(null);
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(","),
      fontSize: 14,
      h5: {
        fontWeight: 600
      }
    }
  });

  useEffect(() => {
    getWeather(city)
      .then(weather => {
        setCurrentWeather(weather);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });
  }, [city, error]);

  useEffect(() => {
    getForecast(city)
      .then(data => {
        setForecast(data);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });
  }, [city, error]);

  const handleCityChange = city => {
    setCity(city);
  };

  if (
    (currentWeather && Object.keys(currentWeather).length) ||
    (forecast && Object.keys(forecast).length)
  ) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm">
          <Weather
            city={city}
            currentWeather={currentWeather}
            forecast={forecast}
            onCityChange={handleCityChange}
            error={error}
          />
        </Container>
      </ThemeProvider>
    );
  } else {
    return (
      <div>
        <CircularProgress color={error ? "secondary" : "primary"} />
        {error ? <p>{error}</p> : ""}
      </div>
    );
  }
}

function getWeather(city) {
  return fetch(
    `${process.env.REACT_APP_API_URL}/weather/?q=${city}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
  )
    .then(res => handleResponse(res))
    .then(weather => {
      if (Object.entries(weather).length) {
        const mappedData = mapDataToWeatherInterface(weather);
        return mappedData;
      }
    });
}

function getWeatherById(cityId) {
  return fetch(
    `${process.env.REACT_APP_API_URL}/weather/?id=${cityId}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
  )
    .then(res => handleResponse(res))
    .then(weather => {
      if (Object.entries(weather).length) {
        const mappedData = mapDataToWeatherInterface(weather);
        return mappedData;
      }
    });
}

function getForecast(city) {
  return fetch(
    `${process.env.REACT_APP_API_URL}/forecast/?q=${city}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
  )
    .then(res => handleResponse(res))
    .then(forecastData => {
      if (Object.entries(forecastData).length) {
        return forecastData.list
          .filter(forecast => forecast.dt_txt)
          .map(mapDataToWeatherInterface);
      }
    });
}

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error: Location " + response.statusText.toLowerCase());
  }
}

function mapDataToWeatherInterface(data) {
  const mapped = {
    city: data.name,
    condition: data.cod,
    country: data.sys.country,
    date: data.dt * 1000,
    description: data.weather[0].description,
    feels_like: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    icon_id: data.weather[0].id,
    sunrise: data.sys.sunrise * 1000,
    sunset: data.sys.sunset * 1000,
    temperature: Math.round(data.main.temp),
    minTemperature: Math.round(data.main.temp_min),
    maxTemperature: Math.round(data.main.temp_max),
    dateTime: data.dt_txt,
    wind_speed: Math.round(data.wind.speed * 3.6)
  };

  return mapped;
}

export default App;
