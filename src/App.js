import React, { useState, createContext } from "react";
import Axios from "axios";
import { Switch } from "antd";
import "./App.css";

export const ThemeContext = createContext(null);

function App() {
    const [city, setCity] = useState("");
    const [data, setData] = useState({});
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        theme === "light" ? setTheme("dark") : setTheme("light");
    };

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=73b5df647428e78a74096d1e58c018e2&units=metric`;

    const searchCity = (e) => {
        if (e.key === "Enter") {
            Axios.get(url).then((response) => {
                setData(response.data);
            });
            setCity("");
        }
    };
    return (
        <ThemeContext.Provider value={(theme, toggleTheme)}>
            <div className="app" data-theme={theme}>
                <div className="city-search">
                    <input
                        type="text"
                        placeholder="Search a city..."
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value);
                            // console.log(e.target.value);
                        }}
                        onKeyPress={searchCity}
                    />
                    <h4>
                        {new Date().toLocaleDateString("en-GB", {
                            dateStyle: "full"
                        })}
                    </h4>
                </div>
                <div className="toggle">
                    <Switch className="toggle-btn" onClick={toggleTheme} />
                    <span>
                        {theme === "light" ? "Light Mode" : "Dark Mode"}
                    </span>
                </div>
                <div className="container">
                    {data.name !== undefined && (
                        <div className="main">
                            <div className="location">
                                <h2>{data.name}</h2>
                            </div>
                            <div className="temperature">
                                {data.main ? (          // if data.main is available then proceed to temperature, description etc.
                                    <h1>{data.main.temp.toFixed(1)}°C</h1>
                                ) : null}
                            </div>
                            <div className="weather-description">
                                {data.main ? (
                                    <p>{data.weather[0].description}</p>
                                ) : null}
                            </div>
                        </div>
                    )}
                    {data.name !== undefined && (
                        <div className="extra-details">
                            <div className="min-temp">
                                {data.main ? (
                                    <h2>{data.main.temp_min.toFixed(1)}°C</h2>
                                ) : null}
                                <p>Min Temp</p>
                            </div>
                            <div className="max-temp">
                                {data.main ? (
                                    <h2>{data.main.temp_max.toFixed(1)}°C</h2>
                                ) : null}
                                <p>Max Temp</p>
                            </div>
                            <div className="humidity">
                                {data.main ? (
                                    <h2>{data.main.humidity}%</h2>
                                ) : null}
                                <p>Humidity</p>
                            </div>
                            <div className="wind-speed">
                                {data.wind ? (
                                    <h2>{data.wind.speed.toFixed(1)} m/sec</h2>
                                ) : null}
                                <p>Wind Speed</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
