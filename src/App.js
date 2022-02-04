import {React, useState} from "react";
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
    opacity: "0.6",
    padding: "10px 18px",
    fontSize: "1.8rem",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#F9f8f8",
    },
    //add margin between the search lenes and the text
    "& .MuiSvgIcon-root": {
      marginRight: "8px",
    },
  },
});

function App() {
  const classes = useStyles();
  const placeHolderImg = require("./images/place-h-img.jpg");
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [backImg, setBackImg] = useState(placeHolderImg);
  const [icon, setIcon] = useState("");

  const handleSearch = async (e) => {
    const weatherAPI = "https://api.openweathermap.org/data/2.5/";
    const unsplashAPI = "https://api.unsplash.com/search/photos/";

    // e.preventDefault();
    if (e.key === "Enter") {
      const weatherRes = await fetch(
        `${weatherAPI}weather?q=${query}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
      );

      const weatherData = await weatherRes.json();
      const currentIcon = await weatherData.weather[0].icon;

      setWeather(weatherData);
      setIcon(currentIcon);

      // corospending image
      const imgRes = await fetch(
        `${unsplashAPI}?query=${query}&client_id=${process.env.REACT_APP_UNSPLASH_KEY}`
      );

      const imgData = await imgRes.json();
      //if picture is not found from the unsplash api then use the placeholder image
      if (imgData.results.length === 0) {
        setBackImg(placeHolderImg);
      } else {
        const currentImg = await (imgData.results[0].urls.regular ||
          imgData.results[0].urls.raw);
        setBackImg(currentImg);
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
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={handleSearch}
            startAdornment={<SearchIcon />}
          />
        </div>
        {typeof weather.main != "undefined" ? (
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
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
