import React from "react";
import moment from "moment";
// var utc = require("moment/plugin/utc"); // dependent on utc plugin
// moment.extend(utc);

export default function WeatherCardHeader(props) {
  const { currentWeather } = props;
  const date = moment().isValid(currentWeather.date) ? currentWeather.date : "";
  const description = currentWeather.description
    ? currentWeather.description
    : "";

  return (
    <>
      <span>
        {/* {moment(date).format("dddd")},{" "}
        {moment(date)
          .utcOffset(currentWeather.timezone)
          .format("h:mm A")}
        ,{" "} */}
        {description.replace(/\w\S*/g, txt => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        })}
      </span>
    </>
  );
}