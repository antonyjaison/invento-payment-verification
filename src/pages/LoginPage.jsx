import "../styles/loginpage.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setUser, getUser } from "../utils/user";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);
  const passwordRef = useRef(null);
  const errorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    errorRef.current.style.display = "none";
  }, []);

  const handleUsernameChange = (e) => {
    inputRef.current.style.outline = "1px solid var(--primary-color)";
    errorRef.current.style.display = "none";
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    passwordRef.current.style.outline = "1px solid var(--primary-color)";
    errorRef.current.style.display = "none";
    setPassword(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (username === "") {
      inputRef.current.style.outline = "1px solid red";
    }
    if (password === "") {
      passwordRef.current.style.outline = "1px solid red";
    }

    if (
      username === import.meta.env.VITE_USERNAME &&
      password === import.meta.env.VITE_PASSWORD
    ) {
      setUser(username);
      navigate("/");
    } else {
      inputRef.current.style.outline = "1px solid red";
      passwordRef.current.style.outline = "1px solid red";
      if (username && password) {
        errorRef.current.style.display = "block";
      }
    }
  };

  useEffect(() => {
    const user = getUser();
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <main className="login_wrapper">
      <form className="login_form">
        <h1>Login</h1>
        <input
          value={username}
          onChange={handleUsernameChange}
          type="text"
          placeholder="Username"
          ref={inputRef}
        />
        <input
          value={password}
          onChange={handlePasswordChange}
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />
        <input
          ref={errorRef}
          disabled
          className="err_section"
          value="Invalid Credentials"
          type="text"
        />
        <button onClick={handleClick} type="submit" className="btn dark_btn">
          Login
        </button>
      </form>
    </main>
  );
};

export default LoginPage;
