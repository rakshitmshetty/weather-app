import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import moment from "moment";

const useStyles = makeStyles((theme) => ({
  color: {
    color: "#673ab7",
  },
}));

export default function Forecast(props) {
  const { forecast, selectedDate } = props;
  const selectedForecast = forecast.filter(
    (ele) => moment(ele.dateTime).isSame(selectedDate, 'date')
  );
  const result = selectedForecast.map((item, index) => {
 
    return (
      <ListItem key={index} className="forecastItem">
        <ListItemText
          className="week-day"
          primary={`${moment(item.date).format("LT")} `}
          style={{ flex: "1 1 0%", textAlign: "left" }}
        ></ListItemText>
        <span className="temp" style={{ flex: "1 1 0%", textAlign: "right" }}>
          <Typography variant="body2" component="span" color="textPrimary">
            {item.minTemperature}&deg; /{" "}
          </Typography>
          <Typography variant="body2" component="span" color="textSecondary">
            {item.maxTemperature}&deg;
          </Typography>
        </span>
      </ListItem>
    );
  });

  return <List aria-label="forecast data">{result}</List>;
}
