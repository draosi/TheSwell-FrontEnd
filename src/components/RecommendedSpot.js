import { useContext, useEffect, useState } from "react";
import { TheSwellContext } from "../context/TheSwellContext";
import jwt_decode from "jwt-decode";
import axios from "axios";
import "../css/RecommendedSpot.css";

const RecommendedSpot = () => {
  // Get all the spots and all the user data from our context
  const { value1, value9, value4 } = useContext(TheSwellContext);
  const [spots, setSpots] = value9;
  const [users, setUsers] = value4;

  const [oneUser, setOneUser] = useState();
  const [yourSurf, setYourSurf] = useState([]);
  let lvl = [];

  // Initializing loaders
  const [loading, setLoading] = useState(false);
  const [secondLoading, setSecondLoading] = useState(false);

  const token = localStorage.usertoken;
  const decoded = token && jwt_decode(token);

  // Map all our spots and fetch the waves data for each spot - return only the waves data of the 24 first hours for each spots
  const whereToSurf = async () => {
    const responseArray = await Promise.all(
      spots.map(
        async (e) =>
          await axios.get(
            `https://marine-api.open-meteo.com/v1/marine?latitude=${e.latitude}&longitude=${e.longitude}&hourly=wave_height&hourly=wave_period&hourly=wave_direction`
          )
      )
    );
    // Keep only wave height from all the data received
    const secondArray = await responseArray.map((element) => {
      return element.data.hourly.wave_height;
    });
    // Keep only the 24 first hours of the waves height data
    const first24Hours = await secondArray.map((element) => {
      return element.slice(0, 24);
    });
    return first24Hours;
  };

  // fetch the data from one user and get its level
  const fetchMyUser = async () => {
    try {
      const callData = await axios.get(
        `http://localhost:8000/api/users/${decoded.user._id}`
      );
      // Store the data in oneUser state variable
      setOneUser(callData.data);
      // Once the data is loaded, we sort the level of the user and store it into the lvl variable 
      setSecondLoading(true);
      if (oneUser.level == 1) {
        lvl = levelOne;
      }
      if (oneUser.level == 2) {
        lvl = levelTwo;
      }
      if (oneUser.level == 3) {
        lvl = levelThree;
      }
      if (oneUser.level == 4) {
        lvl = levelFour;
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Create a function to store whereToSurf data into yourSurf state variable
  async function fetchWhereToSurf() {
    try {
      const data = await whereToSurf();
      setYourSurf(data);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  }

  // Creating an array to store the spot with its surf data
  const newArray = yourSurf.map((e, id) => [
    e,
    spots[id].spot_name,
    spots[id].latitude,
    spots[id].longitude,
  ]);

  // Filter the waves sizes regarding the user level
  const levelOne = newArray.map((e, i) => [
    e[0].filter((el) => el < 1.0),
    e[1],
  ]);

  const levelTwo = newArray.map((e, i) => [
    e[0].filter((el) => el < 1.5 && el > 1),
    e[1],
  ]);

  const levelThree = newArray.map((e, i) => [
    e[0].filter((el) => el < 2.0 && el > 1.5),
    e[1],
  ]);

  const levelFour = newArray.map((e, i) => [e[0].filter((el) => el > 2), e[1]]);

  // When the app is mounting, execute the two functions
  useEffect(() => {
    fetchMyUser();
    fetchWhereToSurf();
  }, []);

  return (
    <div>
      <h4>Best spots for you to surf !</h4>
      <div className="spot-card scroll">
        <div className="div">
          <div>
          {/* Display the spots according to the level of the user */}
            {secondLoading &&
              oneUser.level === 1 &&
              levelOne.map((e, i) => {
                return e[0] != 0 && <div className="spot" key={i}>{e[1]}</div>;
              })}
          </div>
          <div>
            {secondLoading &&
              oneUser.level === 2 &&
              levelTwo.map((e, i) => {
                return e[0] != 0 && <div className="spot" key={i}>{e[1]}</div>;
              })}
          </div>
          <div>
            {secondLoading &&
              oneUser.level === 3 &&
              levelThree.map((e, i) => {
                return e[0] != 0 && <div className="spot" key={i}>{e[1]}</div>;
              })}
          </div>
          <div>
            {secondLoading &&
              oneUser.level === 4 &&
              levelFour.map((e, i) => {
                return e[0] != 0 && <div className="spot" key={i}>{e[1]}</div>;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedSpot;
