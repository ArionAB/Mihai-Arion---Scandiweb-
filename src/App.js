import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
