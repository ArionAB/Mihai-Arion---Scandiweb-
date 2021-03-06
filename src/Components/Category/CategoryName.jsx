import "./CategoryName.styles.scss";

import React, { Component } from "react";

import { graphql } from "@apollo/client/react/hoc";
import { GET_CATEGORY_NAMES } from "../../GraphQL/queries";

class CategoryName extends Component {
  displayCategories() {
    const data = this.props.data;
    if (data.loading) {
      return <div>Loading Categories</div>;
    }
    if (data.error) {
      return <div>Something went wrong</div>;
    } else {
      return data.categories.map((category, index) => {
        return (
          <div key={index}>
            <a href={`/category/${category.name}`}>
              <li key={index}>{category.name}</li>
            </a>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div className="category">
        <ul>{this.displayCategories()}</ul>
      </div>
    );
  }
}

export default graphql(GET_CATEGORY_NAMES)(CategoryName);
