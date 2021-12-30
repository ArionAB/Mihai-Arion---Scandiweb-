import "./App.css";
import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Nav from "./Components/Nav/nav";
import All from "./Pages/Homepage/All/all";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/all" element={<All />} />
        </Routes>
      </div>
    );
  }
}

export default App;
