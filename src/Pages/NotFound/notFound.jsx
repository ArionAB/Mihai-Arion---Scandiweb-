import React, { Component } from "react";

class notFound extends Component {
  render() {
    return (
      <div>
        <h1>ERROR 404 URL NOT FOUND</h1>
        <a href="/">
          It looks like you reached a URL that doesn't exist. Please use the
          navigation above or click this text to go back to the homepage{" "}
        </a>
      </div>
    );
  }
}

export default notFound;
