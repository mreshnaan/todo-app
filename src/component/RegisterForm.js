// RegisterForm.js
import React, { useState } from "react";
import { useMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";

const RegisterMutation = graphql`
  mutation RegisterForm_RegisterMutation($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      id
      email
      todos {
        id
        task
        completed
      }
    }
  }
`;

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, { loading, error }] = useMutation(RegisterMutation);

  const handleSubmit = (event) => {
    event.preventDefault();
    register({
      variables: {
        email,
        password,
      },
      onCompleted: (response) => {
        console.log("success", response);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "loading..." : "Register"}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
}

export default RegisterForm;
