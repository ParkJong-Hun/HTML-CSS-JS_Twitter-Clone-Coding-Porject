import React, { useState } from 'react';
import { Route } from 'react-router';
import AppRouter from 'components/Router';
import {authService} from "fbase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggiedIn={isLoggedIn}/>
      <footer>&copy; Pwitter {new Date().getFullYear()}</footer>
    </>
  );
}
export default App;
