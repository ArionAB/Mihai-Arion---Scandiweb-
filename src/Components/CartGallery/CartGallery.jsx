import React, { Component } from "react";

import { ReactComponent as LeftArrow } from "../../Assets/left-arrow-svgrepo-com.svg";
import { ReactComponent as RightArrow } from "../../Assets/right-arrow-svgrepo-com.svg";
import "./CartGallery.styles.scss";

class CartGallery extends Component {
  state = {
    index: 0,
  };

  nextImg = () => {
    const { image } = this.props;
    const { index } = this.state;
    const galleryLength = image.length;
    if (index !== galleryLength - 1) {
      this.setState({ index: index + 1 });
    } else this.setState({ index: 0 });
  };

  previousImage = () => {
    const { index } = this.state;
    const { image } = this.props;
    const galleryLength = image.length;

    if (index !== 0) {
      this.setState({ index: index - 1 });
    } else this.setState({ index: galleryLength - 1 });
  };

  render() {
    const { index } = this.state;
    const { image } = this.props;

    return (
      <div className="cart-gallery">
        <LeftArrow
          className={image.length > 1 ? "left-arrow" : "hidden-arrow"}
          onClick={this.previousImage}
        />
        <img className="cart-img" src={image[index]} />
        <RightArrow
          className={image.length > 1 ? "right-arrow" : "hidden-arrow"}
          onClick={this.nextImg}
        />
      </div>
    );
  }
}

export default CartGallery;
