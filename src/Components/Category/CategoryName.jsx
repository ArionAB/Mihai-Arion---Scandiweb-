import "./CategoryName.styles.scss";

import React, { Component } from "react";
import { gql } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import { Link } from "react-router-dom";
import Clothes from "../../Pages/Clothes/clothes";

const GET_CATEGORY_NAMES = gql`
  query {
    categories {
      name
    }
  }
`;

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
          <>
            <Link key={index} to={`/category/${category.name}`}>
              <li>{category.name}</li>
            </Link>
          </>
        );
      });
    }
  }
  render() {
    return (
      <div>
        <ul>{this.displayCategories()}</ul>
      </div>
    );
  }
}

export default graphql(GET_CATEGORY_NAMES)(CategoryName);
