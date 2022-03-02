import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Trustpilot } from "../../Assets/trustpilot-svgrepo-com.svg";

import "../Homepage/Homepage.styles.scss";

class Homepage extends Component {
  constructor() {
    super();
    this.myRef = React.createRef();
    this.seconRef = React.createRef();
    this.thirdRef = React.createRef();
    this.state = {
      itemOne: false,
      itemTwo: false,
      itemThree: false,
    };
    /*     const myRef = 
        seconRef = useRef(null),
        thirdRef = useRef(null); */
  }

  componentDidMount() {
    const topPosition = (element) => element.getBoundingClientRect().top;
    const div1Pos = topPosition(this.myRef.current);
    const div2Pos = topPosition(this.seconRef.current);
    const div3Pos = topPosition(this.thirdRef.current);
    // console.log(div1Pos, div2Pos, div3Pos);
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      // console.log(scrollPosition, "scroll");
      // console.log(scrollPosition - div2Pos)
      console.log(scrollPosition - div3Pos < 50, scrollPosition - div2Pos);

      if (div1Pos < scrollPosition) {
        this.setState((state) => ({ ...state, itemOne: true }));
      }
      if (scrollPosition - div2Pos > 500) {
        this.setState((state) => ({ ...state, itemTwo: true }));
      }
      if (scrollPosition - div3Pos > 880) {
        this.setState((state) => ({ ...state, itemThree: true }));
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }
  /* componentDidUpdate() {
    const topPosition = (element) => element.getBoundingClientRect().top;
    const div1Pos = topPosition(this.myRef.current);
    const div2Pos = topPosition(this.seconRef.current);
    const div3Pos = topPosition(this.thirdRef.current);
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      if (div1Pos < scrollPosition) {
        this.setState((state) => ({ ...state, itemOne: true }));
      }
      if (div2Pos < scrollPosition) {
        this.setState((state) => ({ ...state, itemTwo: true }));
      }
      if (div3Pos < scrollPosition) {
        this.setState((state) => ({ ...state, itemThree: true }));
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  } */
  render() {
    const { itemOne, itemTwo, itemThree } = this.state;
    // console.log(itemOne, itemTwo, itemThree);
    return (
      <div className="HP-container">
        <div className="order">
          <div className="left">
            <h1>
              High quality clothes & tech, <span>delivered</span> to your door.
            </h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500.
            </p>
            <Link to="/category/all">
              <button>Place an Order</button>
            </Link>
            <div className="trustpilot">
              <p className="asd">
                <Trustpilot />
                Trustpilot
              </p>

              <p>
                <span className="numbers">4.8 out of 5</span> based on 2000+
                reviews
              </p>
            </div>
          </div>
          <div className="right">
            <div className="background"></div>
            <img src={require("../../Assets/RockPS.png")} alt="Rock" />
          </div>
        </div>
        <div className={itemOne ? "test-active" : "test"} ref={this.myRef}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga ratione
          reprehenderit, in esse numquam cumque minima at magnam, perferendis
          maxime amet perspiciatis aut ut obcaecati. Porro quibusdam quisquam
          nobis cum?
        </div>
        <div className={itemTwo ? "test1-active" : "test1"} ref={this.seconRef}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse at
          repellendus fugiat molestiae vero. Modi ipsum dolorum atque sequi,
          magni quibusdam qui reprehenderit ea sed, voluptatibus sit ratione nam
          voluptate?
        </div>
        <div
          className={itemThree ? "test2-active" : "test2"}
          ref={this.thirdRef}
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum
          voluptate deleniti nihil provident eveniet ipsum odit impedit neque
          modi. Recusandae dolor at mollitia enim quibusdam laboriosam a
          reiciendis nemo excepturi?
        </div>
      </div>
    );
  }
}

export default Homepage;
