import React, { lazy } from 'react';
import './App.css';
const Home = lazy(() => import("./Components/HomeComponent/HomeComponent"));
const Header = lazy(() => import("./SharedComponents/HeaderComponent/HeaderComponent"));

function App() : JSX.Element {
  return (
    <>
    <Header></Header>
    <Home></Home>
    </>
  );
}


export default App;
