import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Profile.css";

const Profile = () => {
  const initialValue = {
    id: "",
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    street: "",
    city: "",
    zip_code: "",
    country: "",
    password: "",
    level: "",
    image: "",
    role: "",
  };

  // Initialize two state variables to update the user info
  const [user, setUser] = useState(initialValue);
  const [details, setDetails] = useState(initialValue);

  useEffect(() => {
    getProfil();
  }, []);

  // fetch the user info with its id - We get the id thanks to the token
  const getProfil = async () => {
    const token = await localStorage.usertoken;
    const decoded = await jwt_decode(token);

    axios
      .get(`https://the-swell-back-i7o00030s-draosi.vercel.app/api/users/${decoded.user._id}`)
      .then((res) => setUser(res.data));

    // Store the user info inside the details state variable
    setDetails({
      id: decoded.user._id,
      username: decoded.user.username,
      email: decoded.user.email,
      first_name: decoded.user.first_name,
      last_name: decoded.user.last_name,
      street: decoded.user.street,
      city: decoded.user.city,
      zip_code: decoded.user.zip_code,
      country: decoded.user.country,
      password: decoded.user.password,
      level: decoded.user.level,
      image: decoded.user.image,
      role: decoded.user.role,
    });
  };

  return (
    <div className="profile">
      <div>
        <h1>YOUR PROFILE</h1>
      </div>
      <div>
        <div className="image-surf-infos">
          <div className="circle-image">
            <img
              src={`https://the-swell-back-i7o00030s-draosi.vercel.app${user.image}`}
              alt=""
              className="img"
            />
          </div>
          <div className="surf-infos-card">
            <h2>My surf informations</h2>
            <div className="row border-style">
              <h4>Level :</h4>
              <p>{user.level}</p>
            </div>
            <div>
              <h4 style={{ textAlign: "left", marginLeft: "75px" }}>
                How do I determine my level ?
              </h4>
              <div className="row">
                <h4>Level 1 :</h4>
                <p>Beginner, waves under 1m</p>
              </div>
              <div className="row">
                <h4>Level 2 :</h4>
                <p>Intermediate, waves between 1m and 1,5m</p>
              </div>
              <div className="row">
                <h4>Level 3 :</h4>
                <p>Good, waves between 1,5m and 2m</p>
              </div>
              <div className="row">
                <h4>Level 4 :</h4>
                <p>Expert, waves over 2m</p>
              </div>
            </div>
          </div>
        </div>
        <div className="infos-card">
          <h2 className="title">Vos informations</h2>
          <div className="infos">
            <div className="row">
              <h4>Id :</h4>
              <p>{details.id}</p>
            </div>
            <div className="row">
              <h4>Username :</h4>
              <p>{user.username}</p>
            </div>
            <div className="row">
              <h4>Email :</h4>
              <p>{user.email}</p>
            </div>
            <div className="row">
              <h4>First name :</h4>
              <p>{user.first_name}</p>
            </div>
            <div className="row">
              <h4>Last name :</h4>
              <p>{user.last_name}</p>
            </div>
            <div className="row">
              <h4>Address :</h4>
              <p>{user.street}</p>
            </div>
            <div className="row">
              <h4>City :</h4>
              <p>{user.city}</p>
            </div>
            <div className="row">
              <h4>Zip code :</h4>
              <p>{user.zip_code}</p>
            </div>
            <div className="row">
              <h4>Country :</h4>
              <p>{user.country}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="button">
        <button className="button-name">
          <Link to={`/surveys/${details.id}`} style={{textDecoration:'none', color:'black'}} className="btn-mycomments">
            Surveys history
          </Link>
        </button>
        <button className="button-name">
          <Link to={`/edit/${details.id}`} style={{textDecoration:'none', color:'black'}}>Edit my profile</Link>
        </button>
      </div>
    </div>
  );
};

export default Profile;
