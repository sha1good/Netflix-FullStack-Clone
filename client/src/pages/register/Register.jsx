import { useState } from "react";
import "./register.scss";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { publicRequest } from "../../hooks/requestMethods";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  const handleFinish = async (event) => {
    event.preventDefault();
    try {
      await publicRequest.post("/auth/register", {
        email,
        username,
        password,
      });
      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <Link to="/login" style={{ cursor: "pointer", zIndex: "999" }}>
            <button className="loginButton">Sign In</button>
          </Link>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              type="username"
              placeholder="username"
              ref={usernameRef}
              onChange={() => setUsername(usernameRef.current.value)}
            />
            <input
              type="password"
              placeholder="password"
              ref={passwordRef}
              onChange={() => setPassword(passwordRef.current.value)}
            />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
