import "./App.css";
import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Nav from "./Components/Nav/nav";
import All from "./Pages/Homepage/All/all";
import Clothes from "./Pages/Clothes/clothes";
import Tech from "./Pages/Tech/tech";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/all" element={<All />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/tech" element={<Tech />} />
        </Routes>
      </div>
      // <Route path="/clothes" element={<Clothes />} />
    );
  }
}

export default App;
