// App.js
import React from "react";
import TodoList from "./component/TodoList";
import LoginForm from "./component/LoginForm";
import RegisterForm from "./component/RegisterForm";

function App() {
  const token =localStorage.getItem("token")
  return (
    <>
      {token ? (
        <>
          <TodoList />
        </>
      ) : (
        <>
          <LoginForm />
          <RegisterForm />
        </>
      )}
    </>
  );
}

export default App;
