import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import CategoryName from "./Pages/Category/CategoryName";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<CategoryName />} />
        </Routes>
      </div>
    );
  }
}

export default App;
