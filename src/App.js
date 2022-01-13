import "./App.css";
import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Nav from "./Components/Nav/nav";

import GetId from "./Components/GetId";
import GetTitle from "./Components/getTitle";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/category/:title" element={<GetTitle />} />
          <Route path="/product/:id" element={<GetId />} />
        </Routes>
      </div>
    );
  }
}

export default App;
