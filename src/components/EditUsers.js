import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../css/Register.css";
import jwt_decode from "jwt-decode";

const EditUsers = () => {
  const { id } = useParams();

  // To get the user infos with its token
  const token = localStorage.usertoken;
  const decoded = token && jwt_decode(token);


  let navigate = useNavigate();

  // Create a state with fields which the user will be able to modify its profil
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    street: "",
    city: "",
    zip_code: "",
    country: "",
    level: "",
    image: "",
  });

  // Fetch the user data and initialize the state with it
  const getUser = () => {
    axios
      .get(`http://localhost:8000/api/users/${decoded.user._id}`)
      .then((res) => {
        setUser({
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          street: res.data.street,
          city: res.data.city,
          zip_code: res.data.zip_code,
          country: res.data.country,
          level: res.data.level,
          image: res.data.image,
        });
      });
  };

  // When the apps mount itself, execute the fonction 'getUser'
  useEffect(() => {
    getUser();
  }, []);

  // Edit the user information and then navigate to the profil page
  const editUser = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/users/${id}`, user)
      .then((res) => console.log(res));
    navigate("/profile");
  };

  return (
    <div>
      <div className="register-box">
        <div className="register-txt">
          <tr>
            <td style={{ textAlign: "center" }}>
              <h2>Edit</h2>
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
        <form onSubmit={editUser}> {/* Execute the editUser function on the submit of the form */}
          <div className="user-box">
            <input 
              type="firstName"
              name="first_name"
              onChange={(e) =>
                e.target.value &&
                setUser({ ...user, first_name: e.target.value })
              }
            /> {/* If the user fill the input, set the user with the new input */}
            <label>First name</label>
          </div>
          <div className="user-box">
            <input
              type="lastName"
              name="last_name"
              onChange={(e) =>
                e.target.value &&
                setUser({ ...user, last_name: e.target.value })
              }
            />
            <label>Last name</label>
          </div>
          <div className="user-box">
            <input
              type="street"
              className="form-control"
              name="street"
              onChange={(e) =>
                e.target.value && setUser({ ...user, street: e.target.value })
              }
            />
            <label>Street</label>
          </div>
          <div className="user-box">
            <input
              type="city"
              name="city"
              onChange={(e) =>
                e.target.value && setUser({ ...user, city: e.target.value })
              }
            />
            <label>City</label>
          </div>
          <div className="user-box">
            <input
              type="zipCode"
              name="zip_code"
              onChange={(e) =>
                e.target.value && setUser({ ...user, zip_code: e.target.value })
              }
            />
            <label>Zip code</label>
          </div>
          <div className="user-box">
            <input
              type="country"
              name="country"
              onChange={(e) =>
                e.target.value && setUser({ ...user, country: e.target.value })
              }
            />
            <label>Country</label>
          </div>
          <div className="user-box">
            <input
              type="level"
              name="level"
              onChange={(e) =>
                e.target.value && setUser({ ...user, level: e.target.value })
              }
            />
            <label>Level</label>
          </div>
          <div className="user-box">
            <input
              type="file"
              name="image"
              onChange={(e) =>
                e.target.files[0] &&
                setUser({ ...user, image: e.target.files[0] })
              }
            />
            <label>Image</label>
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

export default EditUsers;
