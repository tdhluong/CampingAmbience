import React, { useState, useEffect } from "react";
import "../style/Home.css";

import info from "../assets/information-button.png";
import infoW from "../assets/information-icon.png";

import MySlider from "./Slider";
import sounds from "../components/sounds";

import daytime from "../assets/daytime.mp4";
import nighttime from "../assets/night.mp4";

import ReactSwitch from "react-switch";

function Home() {
  // Info
  const [show, setShow] = useState(false);

  // Sounds
  const [value, setValue] = useState(sounds.birdsSound);

  const options = [
    { sound: "Birds", value: sounds.birdsSound },
    { sound: "Crickets", value: sounds.cricketsSound },
  ];

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // Dark Mode
  const [theme, setTheme] = useState("light");
  const [checked, setChecked] = useState(false);
  const toggleTheme = (val) => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    setChecked(val);
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="Home">
      <div className="top">
        <div className="leftTop">
          <header>Camping Ambience</header>
          <img
            src={theme === "light" ? info : infoW}
            className="info-icon"
            onClick={() => setShow(!show)}
          ></img>
        </div>
        <div className={`App ${theme}`}>
          <h3>Dark Mode</h3>
          <ReactSwitch checked={checked} onChange={toggleTheme} />
        </div>
      </div>

      {show && (
        <pre className="info-text">
          <br></br>
          <div>
            created by{" "}
            <a
              href="https://www.linkedin.com/in/-helen-luong-/"
              target="_blank"
            >
              helen luong{" "}
            </a>{" "}
            <br></br>
            inspired by{" "}
            <a
              href="https://vanessah9.github.io/ridethesubway/"
              target="_blank"
            >
              ridethesubway
            </a>
          </div>
        </pre>
      )}

      <video width="1000" height="600" key={theme} loop autoPlay muted>
        <source
          src={theme === "light" ? daytime : nighttime}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <br />
      <br />

      <div className="volume-control">
        <div>
          <MySlider
            title="Campfire"
            sound={sounds.campfireSound}
            id="campfireSound"
            defaultVolume={0.3}
          ></MySlider>
        </div>

        <div>
          <MySlider
            sound={value}
            id="birdsSound"
            defaultVolume={0.3}
          ></MySlider>

          <div>
            <select value={value} onChange={handleChange} id="dropDown">
              {options.map((option) => (
                <option value={option.value}>{option.sound}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <MySlider
            title="River"
            sound={sounds.river}
            id="river"
            defaultVolume={0.3}
          ></MySlider>
        </div>

        <div>
          <MySlider
            title="Music"
            sound={sounds.music}
            id="music"
            defaultVolume={0.3}
          ></MySlider>
        </div>
      </div>
    </div>
  );
}

export default Home;
