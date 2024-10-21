import { useEffect, useState } from "react";
import Description from "./Components/Description";
import Sunnybg from "./assets/Sunnybg.jpg";
import winterbg from "./assets/winterbg.jpg";
import { getFormattedWeatherData } from "./weatherService";

function App() {
  const [city, setCity] = useState("Chandrapur");
  const [weather, setWeather] = useState(null);
  const [units, setUnit] = useState("metric");
  const [bg, setBg] = useState("Sunnybg");

  useEffect(() => {
    const fecthWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      //dynamic bg
      const threshold = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(winterbg);
      else setBg(Sunnybg);
  
    };

    
   
    fecthWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelcius = currentUnit === "C";
    button.innerText = isCelcius ? "°F" : "°C";
    setUnit(isCelcius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City Name"
              />
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name},${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temprature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                } `}</h1>
              </div>
            </div>

            {/* bottom-description */}
            <Description weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
