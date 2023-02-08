import { useState, useContext } from "react";
import { TheSwellContext } from "../context/TheSwellContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "../css/Surveys.css";

const Survey = () => {
  const [crowd, setCrowd] = useState(0);
  const [matchCondition, setMatchCondition] = useState(0);
  const [current, setCurrent] = useState(0);
  const [parking, setParking] = useState(0);
  const [clean, setClean] = useState(0);
  const [danger, setDanger] = useState(0);
  const [restaurant, setRestaurant] = useState(0);
  const [swimmers, setSwimmers] = useState(0);
  const [mood, setMood] = useState(0);

  const [surveyData, setSurveyData] = useState();

  const { value9 } = useContext(TheSwellContext);
  const [spots, setSpots] = value9;

  let { id } = useParams();

  const findSpotName = spots.find((element) => element._id == id);

  // Récupère la data du user
  const token = localStorage.usertoken;
  const decoded = jwt_decode(token);

  let navigate = useNavigate();

  const createSurvey = (e) => {
    e.preventDefault();

    const newSurvey = {
      crowd: crowd,
      match_conditions: matchCondition,
      current: current,
      parking: parking,
      clean: clean,
      danger: danger,
      restaurants: restaurant,
      swimmers: swimmers,
      mood: mood,
      userId: decoded.user._id,
      spotId: id,
      spot_name: findSpotName.spot_name,
    };

    axios
      .post("http://localhost:8000/api/surveys", newSurvey, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        setSurveyData(res);
        navigate(`/spot/${id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form className="form" onSubmit={createSurvey}>
        <h1>Give us your feedback</h1>
        <h4>1 being the lowest, 10 the highest</h4>
        <h4>{findSpotName.spot_name}</h4>
        <div>
          <label className="label">How crowded was the spot ?</label>
          <input
            className="input"
            type="number"
            placeholder="On a scale from 1 to 10"
            value={crowd}
            onChange={(e) => setCrowd(e.target.value)}
          />
        </div>
        <div>
          <label className="label">
            Did the conditions matched the surf report ?
          </label>
          <input
            className="input"
            type="number"
            placeholder="On a scale from 1 to 10"
            value={matchCondition}
            onChange={(e) => setMatchCondition(e.target.value)}
          />
        </div>
        <div>
          <label className="label">Was there some current ?</label>
          <input
            className="input"
            type="number"
            placeholder="On a scale from 1 to 10"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
        </div>
        <div>
          <label className="label">Were there parking spots available ?</label>
          <input
            className="input"
            type="number"
            placeholder="On a scale from 1 to 10"
            value={parking}
            onChange={(e) => setParking(e.target.value)}
          />
        </div>
        <div>
          <label className="label">Was the beach clean ?</label>
          <input
            className="input"
            type="number"
            placeholder="On a scale from 1 to 10"
            value={clean}
            onChange={(e) => setClean(e.target.value)}
          />
        </div>
        <div>
          <label className="label">
            Were there dangers in the water - jellyfish, sharks ... ?
          </label>
          <input
            className="input"
            type="number"
            placeholder="On a scale from 1 to 10"
            value={danger}
            onChange={(e) => setDanger(e.target.value)}
          />
        </div>
        <div>
          <label className="label">Are there some restaurants near by ?</label>
          <input
            className="input"
            type="number"
            placeholder="On a scale from 1 to 10"
            value={restaurant}
            onChange={(e) => setRestaurant(e.target.value)}
          />
        </div>
        <div>
          <label className="label">Were there swimmers in the water ?</label>
          <input
            className="input"
            type="number"
            placeholder="On a scale from 1 to 10"
            value={swimmers}
            onChange={(e) => setSwimmers(e.target.value)}
          />
        </div>
        <div>
          <label className="label">Were the locals welcoming ?</label>
          <input
            className="input"
            type="number"
            placeholder="On a scale from 1 to 10"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Survey;
