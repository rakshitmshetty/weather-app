import React from "react";

import AppLayout from "../AppLayout/appLayout";
import WeatherSearch from "../WeatherSearch/weatherSearch";

export default function Weather(props) {
  const { city, currentWeather, forecast, onCityChange, error, mainCard, showForecast } = props;
  if (currentWeather && forecast) {
   
    return (
      <div>
        <WeatherSearch city={city} onCityChange={onCityChange} error={error} />
        <AppLayout
          currentWeather={currentWeather}
          forecast={forecast}
        />
      </div>
    );
  }
}