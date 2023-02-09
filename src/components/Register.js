import React, { useState } from "react";
import { register } from "../logic/UserFunctions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Register.css";

const Register = () => {
  // Create a state variable for each field the new user has to file to register (some are not required)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [level, setLevel] = useState("");
  const [image, setImage] = useState();
  const [role, setRole] = useState("");

  const [data, setData] = useState();

  let navigate = useNavigate();

  // Creating a new user
  const createUser = (e) => {
    e.preventDefault();

    // Append a new value to the already existing keys inside the FormData object
    const formData = new FormData();
    formData.append("username", username);
    formData.append("image", image);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("street", street);
    formData.append("city", city);
    formData.append("zip_code", zipCode);
    formData.append("country", country);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("level", level);
    formData.append("role", role);

    // Create a new user and post it into the database - then navigate to the login page
    axios
      .post("http://localhost:8000/auth/register", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        setData(response.data);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="register-box">
        <div className="register-txt">
          <tr>
            <td style={{ textAlign: "center" }}>
              <h2>Register</h2>
            </td>
            <td>
              <div className="container_mouse">
                <span className="mouse-btn">
                  <span className="mouse-scroll"></span>
                </span>
                <span style={{ color: "white", fontSize: "10px" }}>
                  Scroll Down
                </span>
              </div>
            </td>
          </tr>
        </div>
        <form onSubmit={createUser}>
          <div className="user-box">
            <input
              type="text"
              name=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
          </div>

          <div className="user-box">
            <input
              type="email"
              name=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email address</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <div className="user-box">
            <input
              type="firstName"
              name=""
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label>First name</label>
          </div>
          <div className="user-box">
            <input
              type="lastName"
              name=""
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label>Last name</label>
          </div>
          <div className="user-box">
            <input
              type="street"
              className="form-control"
              name=""
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
            <label>Street</label>
          </div>
          <div className="user-box">
            <input
              type="city"
              name=""
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <label>City</label>
          </div>
          <div className="user-box">
            <input
              type="zipCode"
              pattern="[0-9]{5}"
              name=""
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
            <label>Zip code</label>
          </div>
          <div className="user-box">
            <input
              type="country"
              name=""
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <label>Country</label>
          </div>
          <div className="user-box">
            <input
              type="level"
              name=""
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
            <label>Level</label>
          </div>
          <div className="user-box">
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <label>Image</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              name=""
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <label>Role</label>
          </div>
          <div className="submitBtn">
            <button type="submit" className="registerBtn">
              <span>Submit</span>
              <div className="top"></div>
              <div className="left"></div>
              <div className="bottom"></div>
              <div className="right"></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
