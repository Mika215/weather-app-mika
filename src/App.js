import {React, useState} from "react";
import axios from "axios";
import {dateGetter} from "./utils";
import {InputBase, makeStyles} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import "./App.css";
// console.log(process.env)//! check this out it prints out the api keys to the console!
//root className
const useStyles = makeStyles({
  root: {
    backgroundColor: "#fff",
  },
  searchInput: {
    opacity: "0.5",

    padding: "10px 18px",
    fontSize: "1.8rem",
    borderRadius: "8px",
    backgroundColor: "#F9f8f8",

    "&:hover": {
      backgroundColor: "#F9f8f8",
      opacity: "0.9",
    },
    //add margin between the search lenes and the text
    "& .MuiSvgIcon-root": {
      marginRight: "8px",
    },
  },
});

function App() {
  const classes = useStyles();
  const placeHolderImg = require("./images/weather-back.jpg");
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);

  const [backImg, setBackImg] = useState(placeHolderImg);
  const [icon, setIcon] = useState("");

  const handleSearch = async (e) => {
    const weatherAPI = "https://api.openweathermap.org/data/2.5/";
    const unsplashAPI = "https://api.unsplash.com/search/photos/";

    // e.preventDefault();
    if (e.key === "Enter") {
      try {
        const weatherRes = await axios.get(
          `${weatherAPI}weather?q=${query}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
        );

        const imgRes = await axios.get(
          `${unsplashAPI}?query=${query}&client_id=${process.env.REACT_APP_UNSPLASH_KEY}`
        );

        setWeather(weatherRes.data);
        if (weatherRes.data.weather) {
          setIcon(weatherRes.data.weather[0].icon);
        }
        //if picture is not found from the unsplash api then use the placeholder image
        if (imgRes.data.results.length === 0) {
          setBackImg(placeHolderImg);
        } else {
          const currentImg =
            imgRes.data.results[0].urls.regular ||
            imgRes.data.results[0].urls.raw;
          setBackImg(currentImg);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setError(true);
        }
        console.log(error);
      }
      setQuery("");
    }
  };

  return (
    <div className="app" style={{backgroundImage: `url(${backImg})`}}>
      <main>
        <div className="search-box">
          <InputBase
            placeholder="Enter city name..."
            className={classes.searchInput}
            type="text"
            onChange={(e) => {
              setQuery(e.target.value);
              setError(false);
            }}
            value={query}
            onKeyPress={handleSearch}
            startAdornment={<SearchIcon />}
          />
        </div>
        {typeof weather.main != "undefined" && (
          <>
            <div className="location-box">
              <div className="location">
                {weather.name},{weather.sys.country}
              </div>

              <div className="date">{dateGetter(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="tempreture">
                {Math.round(weather.main.temp)}°c
              </div>
              <div className="weather-type">
                {weather.weather[0].description}{" "}
                <img
                  src={{
                    URL: ` http://openweathermap.org/img/wn/${icon}.png`,
                  }}
                  alt=""
                />
              </div>
            </div>
          </>
        )}
        {error && (
          <>
            <div className="location-box">
              <div className="location">Not found! enter valid city Name</div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
