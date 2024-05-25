import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginForm from "./Login";
import Vistas from "./Vistas";
import styled from "styled-components";

interface BookData {
  title: string;
  description: string;
}

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [view, setView] = useState<"cards" | "table">("cards");
  const [bookData, setBookData] = useState<BookData[]>([]);

  useEffect(() => {
    const userData = sessionStorage.getItem("dataUser");
    if (userData) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetchBookData();
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  

  const handleViewChange = () => {
    setView((prevView) => (prevView === "cards" ? "table" : "cards"));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setBookData([]);
    sessionStorage.removeItem("dataUser");
  };

  const fetchBookData = async () => {
    try {
      const response = await axios.get(
        "" //este lo voy a borrar por si acaso esta es la api que iba aqui : https://fakerapi.it/api/v1/texts?_quantity=5&_characters=200&_locale=es_ES
      
      
      );
      setBookData(response.data.data);
    } catch (error) {
      console.error("Error al recuperar datos:", error);
    }
  };

  const Aplicacion= styled.div`
display: grid;
place-items: center;
height: 100vh;
font-family: Verdana, Geneva, Tahoma, sans-serif;
text-align: center;`;


  return (
    <Aplicacion>
      <div className="login-container">
        {!isLoggedIn ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <Vistas
            view={view}
            onViewChange={handleViewChange}
            onLogout={handleLogout}
            bookData={bookData}
          />
        )}
      </div>
    </Aplicacion>
  );
}

export default App;
