import React from "react";
import "./App.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Content from "./components/Content/Content";

function App() {
  return (
    <>
      <Header />
      <Content />
      <Footer text="Twitter Scrapper © 2019" />
    </>
  );
}

export default App;
