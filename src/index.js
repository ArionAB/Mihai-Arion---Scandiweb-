import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import "./index.css";
import { getNamedType } from "graphql";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const GET_CATEGORIES = gql`
  query GetExchangeRates {
    categories {
      name
    }
  }
`;
/* 
const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`; */

export function GetCategories({ onCategorySelected }) {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>`Error ${error.message}`(</p>;

  return (
    <select name="category" onChange={onCategorySelected}>
      {data.categories.map((category) => (
        <option key={category.name} value={category.name}>
          {category.name}
        </option>
      ))}
      ;
    </select>
  );
}

const GET_NAME_TYPE = gql`
  query Type($name: String!) {
    categories(name: $name) {
      name
    }
  }
`;

export function GetNameType({ name }) {
  const { loading, error, data } = useQuery(GET_NAME_TYPE, {
    variables: { name },
  });
  if (loading) return null;
  if (error) return `Error! ${error}`;
  return <p>{data.category.name}</p>;
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App GetCategories={GetCategories} GetNameType={getNamedType} />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
