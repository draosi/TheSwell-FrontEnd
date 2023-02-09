import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const TheSwellContext = createContext();

export const TheSwellController = ({ children }) => {
  const [surfData, setSurfData] = useState([]);
  const [windData, setWindData] = useState([]);
  const [locationData, setLocationData] = useState([]);

  const [query, setQuery] = useState("Lacanau-Ocean");
  const [input, setInput] = useState("");

  const [comments, setComments] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [users, setUsers] = useState([]);
  const [spots, setSpots] = useState([]);

  const [loading, setLoading] = useState(false);

  // Fetch latitude & longitude from the Meteo API, according to the query of the user.
  const fetchLocationData = async () => {
    try {
      const callData = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}`
      );
      setLocationData(callData.data.results[0]);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  // If the query changes, fetchLocationData execute again
  useEffect(() => {
    query && fetchLocationData();
  }, [query]);

  // Fetch waves data from the meteo API
  const fetchSurfData = async () => {
    try {
      const callData = await axios.get(
        `https://marine-api.open-meteo.com/v1/marine?latitude=${locationData.latitude}&longitude=${locationData.longitude}&hourly=wave_height&hourly=wave_period&hourly=wave_direction`
      );
      setSurfData(callData.data);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch wind data from the meteo API
  const fetchWindData = async () => {
    try {
      const callData = await axios.get(
        `https://api.open-meteo.com/v1/meteofrance?latitude=${locationData.latitude}&longitude=${locationData.longitude}&hourly=windspeed_10m&hourly=winddirection_10m&hourly=temperature_2m`
      );
      setWindData(callData.data);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    locationData.latitude && locationData.longitude && fetchSurfData();
    locationData.latitude && locationData.longitude && fetchWindData();
  }, [locationData.longitude, locationData.latitude]);

  // Fetch TheSwell API / Users
  const fetchUsersData = async () => {
    try {
      const callData = await axios.get(`http://localhost:8000/api/users`);
      setUsers(callData.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  // Fetch TheSwell API / Spots
  const fetchSpotsData = async () => {
    try {
      const callData = await axios.get(`http://localhost:8000/api/spots`);
      setSpots(callData.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSpotsData();
  }, []);

  // Fetch TheSwell API / Comments
  const fetchCommentsData = async () => {
    try {
      const callData = await axios.get("http://localhost:8000/api/comments");
      setComments(callData.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCommentsData();
  }, []);

  // Fetch TheSwell API / Surveys
  const fetchSurveysData = async () => {
    try {
      const callData = await axios.get("http://localhost:8000/api/surveys");
      setSurveys(callData.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSurveysData();
  }, [surveys.length]);

  return (
    <TheSwellContext.Provider
      value={{
        value1: [surfData, setSurfData],
        value2: [comments, setComments],
        value3: [surveys, setSurveys],
        value4: [users, setUsers],
        value5: [windData, setWindData],
        value6: [locationData, setLocationData],
        value7: [query, setQuery],
        value8: [input, setInput],
        value9: [spots, setSpots],
      }}
    >
      {loading && children}
    </TheSwellContext.Provider>
  );
};
