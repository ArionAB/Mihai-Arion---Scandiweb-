import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Redux/store";
import { useLayoutEffect, useState } from "react";
import { history } from "./Components/history";
import { Router } from "react-router-dom";

import "./index.css";

export const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const CustomRouter = ({ history, ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};

ReactDOM.render(
  <Provider store={store}>
    <CustomRouter history={history}>
      <PersistGate persistor={persistor}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </PersistGate>
    </CustomRouter>
  </Provider>,
  document.getElementById("root")
);
