import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    const opts = {
      email: email,
      password: password,
    };
    fetch(
      "https://3001-mauriciio89-jwt-1ku18w4m7lz.ws-us72.gitpod.io/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(opts),
      }
    )
      .then((resp) => {
        if (resp.status === 200) return resp.json();
        else alert("there has been some error");
      })
      .then((data) => {
        // console.log(data);
        localStorage.setItem("accessToken", data.accessToken);
        console.log(localStorage.getItem("accessToken"));
        console.log("Este es el token");
        navigate("/private");
      })
      .catch((error) => {
        console.error("there was an error!!!", error);
      });
  };

  return (
    <div className="text-center mt-5">
      <h1>Login</h1>
      <div>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick}>Login</button>
      </div>
    </div>
  );
};
