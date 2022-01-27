import React, { Component } from "react";
import CartItem from "./cart-item/cart-item";

class LocalStorage extends Component {
  //   componentDidMount() {
  //     this.setData();
  //     this.getData();
  //   }

  setData() {
    const { item } = this.props;
    localStorage.setItem("myData", JSON.stringify(item));
    console.log(item);
  }

  getData() {
    let data = localStorage.getItem("myData");
    data = JSON.parse(data);
    // // this.setState({ data: data });
    console.log(data);
  }

  render() {
    this.setData();
    this.getData();
    // const { data } = this.state;
    // console.log(data);
    const { item } = this.props;
    return <div></div>;
  }
}

export default LocalStorage;
