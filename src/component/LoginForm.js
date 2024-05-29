// Login.js

import React, { useState } from "react";
import { useMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";

const LoginFormLoginMutation = graphql`
  mutation LoginFormLoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading, error }] = useMutation(LoginFormLoginMutation);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({
        variables: {
          email,
          password,
        },
        onCompleted: (response) => {
          const token = response.login;
          localStorage.setItem("token", token);
          console.log("success", response.login);
        },
        onError: (error) => {
          console.log(error);
        },
      });
    } catch (error) {
      // Handle login error
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          Login
        </button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
}

export default Login;
