import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const TheSwellContext = createContext();

export const TheSwellController = (props) => {
  const [surfData, setSurfData] = useState([]);
  const [comments, setComments] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSurfData = async () => {
    try {
      const callData = await axios.get(
        'https://marine-api.open-meteo.com/v1/marine?latitude=54.3213&longitude=10.1348&hourly=wave_height'
      );
      setSurfData(callData);
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSurfData();
  }, []);

  return (
    <TheSwellContext.Provider
      value={{
        value1: [surfData, setSurfData],
        value2: [comments, setComments],
        value3: [surveys, setSurveys],
        value4: [users, setUsers],
      }}
    >
      {loading && props}
    </TheSwellContext.Provider>
  );
};
