import React, { Component } from "react";
import { connect } from "react-redux";
import { ReactComponent as LeftArrow } from "../../Assets/left-arrow-svgrepo-com.svg";
import { ReactComponent as RightArrow } from "../../Assets/right-arrow-svgrepo-com.svg";
import "./CartGallery.styles.scss";

class CartGallery extends Component {
  state = {
    index: 0,
    img: "",
    galleryLength: 0,
  };

  getImg() {
    const { index } = this.state;
    const cartItems = this.props.cartItems;

    cartItems.map((item) => {
      const gallery = item.gallery;
      this.setState({ galleryLength: gallery.length });
      const newObj = Object.assign({}, gallery);

      this.setState({ img: newObj[index] });
    });
  }

  nextImage() {
    // const len = this.props.images.length;
    const { index, galleryLength } = this.state;
    console.log(galleryLength);
    if (index !== galleryLength - 1) {
      this.setState({ index: index + 1 });
    } else {
      this.setState({ index: 0 });
    }
  }

  previousImage() {
    // const len = this.props.images.length;

    const { index, galleryLength } = this.state;
    console.log(galleryLength);
    if (index !== 0) {
      this.setState({ index: index - 1 });
    } else {
      this.setState({ index: galleryLength - 1 });
    }
  }

  componentDidMount() {
    // this.getImg();
  }

  render() {
    const { img, galleryLength } = this.state;

    // console.log(galleryLength);

    return (
      <div className="cart-gallery">
        {galleryLength > 1 && (
          <LeftArrow className="left-arrow" onClick={this.previousImage()} />
        )}
        <img className="cart-img" src={img} />;
        {galleryLength > 1 && (
          <RightArrow className="right-arrow" onClick={this.nextImage()} />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ cart: { cartItems } }) => ({
  cartItems,
});
export default connect(mapStateToProps)(CartGallery);
