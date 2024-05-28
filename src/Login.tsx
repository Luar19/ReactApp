import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface LoginProps {
  onLogin: () => void;
}

interface User {
  username: string;
  password: string;
}

const Container = styled.div`
  display: grid;
  place-items: center;
  max-width: 300px;
  margin: 0 auto;
  align-items: center;
  padding: 20px;
  border: 1px solid #002e34;
  border-radius: 5px;
  background-color: #002e34;

  h6 {
    color: #fff;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }

  h2 {
    color: #fff;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
`;

const LoginForm = styled.form`
  display: grid;
  grid-gap: 10px;
`;

const Formularios = styled.input`
  width: 290px;
  border: none;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #ffffff;
  border-radius: 3px;
  outline: none;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 3px;
  background-color: #00c16c;
  color: #fff;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #005a33;
  }
`;


const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [apiUsername, setApiUsername] = useState<string>("");
  const [apiPassword, setApiPassword] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("apiUser");

    if (storedUser) {
      const { username, password } = JSON.parse(storedUser);
      setApiUsername(username);
      setApiPassword(password);
    } else {
      fetch("https://randomuser.me/api/")
        .then((response) => response.json())
        .then((data) => {
          if (data.results.length > 0) {
            const user: User = {
              username: data.results[0].login.username,
              password: data.results[0].login.password,
            };
            setApiUsername(user.username);
            setApiPassword(user.password);
            localStorage.setItem("apiUser", JSON.stringify(user));
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);

  const ValidarUsuario = () => {
    if (username && password) {
      if (username === apiUsername && password === apiPassword) {
        onLogin();
        sessionStorage.setItem("dataUser", JSON.stringify({ username, password }));
      } else if (username !== apiUsername) {
        alert("Usuario no válido");
      } else if (password !== apiPassword) {
        alert("Contraseña incorrecta");
      }
    } else {
      alert("Por favor ingrese usuario y contraseña");
    }
  };

  return (
    <Container>
      <h2>Login</h2>
      <LoginForm>
        <div className="form-group">
          <Formularios
            type="text"
            id="username"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <Formularios
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="button" className="login-button" onClick={ValidarUsuario}>
          Iniciar sesión
        </Button>
      </LoginForm>
      <div className="api-data">
        {apiUsername && apiPassword && (
          <div>
            <h6>User: {apiUsername}</h6>
            <h6>Password: {apiPassword}</h6>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Login;