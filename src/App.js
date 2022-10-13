import React from "react";
import axios from "axios";

export default function App() {
  const [city, setCity] = React.useState("");
  const [data, setData] = React.useState(false);
  const [icon, setIcon] = React.useState("");

  function handleChange(e) {
    setCity(e.target.value);
  }

  function handleSubmit(e) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6ee7bc7454ad5a38e969fd14855a05ec`;
    e.preventDefault();
    axios
      .get(url)
      .then((res) => setData(res.data))
      .catch((err) => alert("Press Ok, Then Enter a VALID City Name"));
    setCity("");
  }
  function toCelsius(f) {
    return (f - 273.15).toFixed();
  }

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a City Name!"
          value={city}
          onChange={handleChange}
        ></input>
        <button>Search</button>
      </form>
      {icon}
      {data != false && (
        <div className="display">
          <div className="top-display">
            <div className="icon-description">
            <img
              className="icon"
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            ></img>
            <p>{data.weather[0].description}</p>
            </div>
            <div className="name-coordinates" id="left-section">
              <h1>{data.name}</h1>
            </div>

            <div className="main-temp-display" id="right-section">
              <h2>{toCelsius(data.main.temp)}°C</h2>
              <div className="high-low">
                <p>H: {toCelsius(data.main.temp_min)}°C</p>
                <p>L: {toCelsius(data.main.temp_max)}°C</p>
              </div>
            </div>
          </div>
          <div className="bottom-display">
            <div className="details">
              <h6>Pressure</h6>
              <span>{data.main.pressure} mbar</span>
            </div>
            <div className="details">
              <h6>Humidity</h6>
              <span>{data.main.humidity} % </span>
            </div>
            <div className="details">
              <h6>Sea Level</h6>
              <span>{data.main.sea_level}</span>
            </div>
            <div className="details">
              <h6>Ground Level</h6>
              <span>{data.main.grnd_level}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
