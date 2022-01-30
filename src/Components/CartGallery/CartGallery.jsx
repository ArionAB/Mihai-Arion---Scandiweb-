import React, { Component } from "react";
import { connect } from "react-redux";
import { ReactComponent as LeftArrow } from "../../Assets/left-arrow-svgrepo-com.svg";
import { ReactComponent as RightArrow } from "../../Assets/right-arrow-svgrepo-com.svg";
import "./CartGallery.styles.scss";

class CartGallery extends Component {
  state = {
    index: 0,
    galleryLength: 0,
  };

  getImg() {
    const cartItems = this.props.cartItems;
    cartItems?.map((item) => {
      const gallery = item.gallery;
      this.setState({ galleryLength: gallery.length });
    });
  }

  nextImg = () => {
    const { index, galleryLength } = this.state;
    if (index !== galleryLength - 1) {
      this.setState({ index: index + 1 });
    } else this.setState({ index: 0 });

    this.getImg();
  };

  previousImage = () => {
    const { index, galleryLength } = this.state;

    if (index !== 0) {
      this.setState({ index: index - 1 });
    } else this.setState({ index: galleryLength - 1 });

    this.getImg();
  };

  componentDidMount() {
    this.getImg();
  }

  render() {
    const { galleryLength, index } = this.state;

    const { image } = this.props;

    console.log("***Gallery length", galleryLength);
    console.log(image.length);
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

const mapStateToProps = ({ cart: { cartItems } }) => ({
  cartItems,
});
export default connect(mapStateToProps)(CartGallery);

/* return (
  <div className="cart-gallery">
    {galleryLength > 1 && (
      <LeftArrow className="left-arrow" onClick={this.previousImage} />
    )}
    <img className="cart-img" src={image[index]} />;
    {galleryLength > 1 && (
      <RightArrow className="right-arrow" onClick={this.nextImg} />
    )}
  </div>
); */
