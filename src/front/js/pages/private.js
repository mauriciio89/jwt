import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Private = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const opts = {
      email: email,
      password: password,
    };
    fetch(
      "https://3001-mauriciio89-pythonflask-zfm8dnw9s8a.ws-us72.gitpod.io/api/private",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(opts),
      }
    )
      .then((resp) => {
        if (resp.status === 200) return resp.json();
        else alert("there has been some error");
      })
      .then((data) => {
        //console.log(data);
        setEmail(data.email);
        console.log(email);
      })
      .catch((error) => {
        console.error("there was an error!!!", error);
      });
  }, []);

  return (
    <div className="text-center mt-5">
      <h1>Hola esta es tu pagina privada</h1>
    </div>
  );
};
