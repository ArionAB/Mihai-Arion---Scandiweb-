import "./App.css";
import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Nav from "./Components/Nav/nav";

import GetId from "./Components/GetId";
import GetTitle from "./Components/getTitle";
import CartPage from "./Pages/cart-page/cart-page";
import NotFound from "./Pages/NotFound/notFound";
import Checkout from "./Pages/checkout/checkout";
import Register from "./Pages/register/register";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/category/:title" element={<GetTitle />} />
          <Route path="/product/:id" element={<GetId />} />
          <Route path="/Cart" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    );
  }
}

export default App;
