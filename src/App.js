import "./_variables.scss";
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
import { auth, getData } from "./Components/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { currentUser } from "./Redux/User/user.actions";
import { connect } from "react-redux";

import Confirmation from "./Pages/confirmation/confirmation";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }
  unsuscribeFromAuth = null;

  componentDidMount() {
    console.log(this.state.user);
    this.auth();
    getData();
  }

  componentWillUnmount() {
    this.unsuscribeFromAuth();
  }

  auth() {
    this.unsuscribeFromAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({ user: user });
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        this.setState({ user: null });
      }
    });
  }
  render() {
    const { user } = this.state;
    const { currentUser } = this.props;
    currentUser(user);

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
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currentUser: (props) => dispatch(currentUser(props)),
});

export default connect(null, mapDispatchToProps)(App);
