import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(localStorage.getItem("accessToken"));
    fetch(
      "https://3001-mauriciio89-jwt-1ku18w4m7lz.ws-us72.gitpod.io/api/private",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    )
      .then((resp) => {
        if (resp.status === 200) return resp.json();
        else alert("there has been some error");
      })
      .then((data) => {
        //console.log(data);
        setEmail(data?.email);
        console.log(email);
      })
      .catch((error) => {
        console.error("there was an error!!!", error);
      });
  }, []);

  return (
    <div className="text-center mt-5">
      <h1>Hola esta es tu pagina privada</h1>
      <h1>{email}</h1>
      <div>
        <button
          onClick={() => {
            localStorage.removeItem("accessToken");
            navigate("/");
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};
