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
import { auth } from "./Components/firebase";
import { onAuthStateChanged } from "firebase/auth";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  unsuscribeFromAuth = null;

  componentDidMount() {
    this.auth();
  }

  componentWillUnmount() {
    this.unsuscribeFromAuth();
  }

  auth() {
    this.unsuscribeFromAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({ currentUser: user });
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        this.setState({ currentUser: null });
      }
    });
  }
  render() {
    const { currentUser } = this.state;
    return (
      <div className="App">
        <Nav user={currentUser} />
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
