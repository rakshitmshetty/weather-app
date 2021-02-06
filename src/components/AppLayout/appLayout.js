import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Grid,
  CardActions,
  Collapse,
  Button,
} from "@material-ui/core";
import moment from "moment";

import Forecast from "../Forecast/forecast";
import WeatherCardHeader from "../WeatherCardHeader/weatherCardHeader";

const useStyles = makeStyles((theme) => ({
  atmospheric: {
    fontSize: "28px",
    padding: "5px",
  },
  buttons: {
    color: "black",
  },
  card: {
    minWidth: 600,
    minHeight: 400,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  error: {
    color: "red",
    padding: "10px",
  },
  fullList: {
    width: "auto",
  },
  layout: {
    marginTop: "20px",
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
 
  root: {
    flexiGrow: 1,
    color: "black",
  },
  search: {
    marginTop: "100px",
  },
  wi: {
    color: "#673ab7",
  },
  dateButton: {
    marginRight: "6px",
  },
}));

export default function AppLayout(props) {
  const classes = useStyles();
  const { currentWeather, forecast } = props;

  return (
    <div className={classes.layout}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <WeatherCard
            currentWeather={currentWeather}
            forecast={forecast}
          />
        </Grid>
      </Grid>
    </div>
  );
}

const WeatherCard = (props) => {
  const classes = useStyles();
  const humidity = "wi wi-humidity";
  const strongWind = "wi wi-strong-wind";
  const currentDate = moment().format("L");
  const [selectedDate, setSelectedDate] = React.useState(currentDate);

  const arrayOfDates = [];

  const { currentWeather, forecast } = props;

  const [showForecast, setShowForecast] = React.useState(false);

  const handleExpandClick = () => {
    setShowForecast(!showForecast);
  };

  for (let index = 0; index < 6; index++) {
    const element = moment().add(index, "days").format("L");
    arrayOfDates.push(element);
  }

  function handleDateChange(date) {
    setSelectedDate(date);
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        title={currentWeather.city + ", " + currentWeather.country}
        subheader={<WeatherCardHeader currentWeather={currentWeather} />}
      />
      <CardContent>
        <Typography
          variant="h2"
          className="big-temp"
          color="textPrimary"
          component="h2"
          style={{ fontFamily: "Montserrat", paddingTop: "30px" }}
        >
          {currentWeather.temperature}&deg;C
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          Feels like {currentWeather.feels_like}&deg;C
        </Typography>
        <Typography
          variant="subtitle2"
          className="atmospheric-conditions"
          color="textSecondary"
          gutterBottom
          style={{ paddingTop: "40px" }}
        >
          <span
            className={`${strongWind} ${classes.wi} ${classes.atmospheric}`}
          ></span>
          {currentWeather.wind_speed} km/h Winds{" "}
          <span
            className={`${humidity} ${classes.wi} ${classes.atmospheric}`}
          ></span>
          {currentWeather.humidity}% Humidity
        </Typography>
        <Divider variant="middle" />
        <CardActions disableSpacing="true">
          <Button size="small" color="primary" onClick={handleExpandClick}>
            Show Forecast
          </Button>
        </CardActions>
        <Collapse in={showForecast} timeout="auto" unmountOnExit>
          <Forecast forecast={forecast} selectedDate={selectedDate} />
          <div>
            {arrayOfDates.map((date, index) => (
              <Button
                key={index}
                variant="outlined"
                className={classes.dateButton}
                color="primary"
                onClick={() => handleDateChange(date)}
              >
                {moment(date).format("DD-MMM")}
              </Button>
            ))}
          </div>
        </Collapse>
      </CardContent>
    </Card>
  );
};
