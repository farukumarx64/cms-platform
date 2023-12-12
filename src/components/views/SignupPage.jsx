// Login.js
import { useState } from "react";
import Auth from "../../backend/auth";
import "../../styles/Login.css";

const auth = new Auth();

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authenticate = async () => {
    const response = await auth.getSession();
    const token = response.session.access_token;
    if (token) {
      console.log("session token: ", token);
      window.location.href = "/home";
    }
  };

  authenticate();

  const handleSignup = async () => {
    await auth.signUp({
      email,
      password,
    });

    console.log("Logged in successfully:");
    window.location.href = "/home";
    // Redirect or perform other actions upon successful login
  };

  return (
    <div id="signup">
      <h2>Sign Up</h2>
      <label>Email:</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <a href="/">Already Registered?</a>
      <button onClick={handleSignup}>Login</button>
    </div>
  );
};

export default SignUp;
