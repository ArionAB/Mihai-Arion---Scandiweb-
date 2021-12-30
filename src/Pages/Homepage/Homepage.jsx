import React, { Component } from "react";
import CategoryName from "../../Components/Category/CategoryName";
import SelectCurrency from "../../Components/selectCurrency/SelectCurrency";

class Homepage extends Component {
  render() {
    return (
      <div>
        <CategoryName />
        <SelectCurrency />
      </div>
    );
  }
}

export default Homepage;
