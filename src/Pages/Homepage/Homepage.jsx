import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Trustpilot } from "../../Assets/trustpilot-svgrepo-com.svg";

import "../Homepage/Homepage.styles.scss";

class Homepage extends Component {
  componentDidMount() {
    this.observer();
  }

  observer() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add the CSS class that has your animation
          entry.target.classList.add("fade-in");
          return;
        }
        // line below will stop from triggering animation everytime is being scrolled
        observer.unobserve(entry.target);
        // entry.target.classList.remove("fade-in");
        //line above triggers animation everytime is being scrolled
      });
    });

    // Observe the element
    const elementLeft = document.querySelectorAll(".reveal-left");
    const elementRight = document.querySelectorAll(".reveal-right");

    elementLeft.forEach((elem) => {
      observer.observe(elem);
    });
    elementRight.forEach((elem) => {
      observer.observe(elem);
    });
  }

  render() {
    return (
      <div className="HP-container">
        <div className="order">
          <div className="left reveal-left ">
            <h1 className="">
              High quality clothes & tech, <span>delivered</span> to your door.
            </h1>
            <p className="reveal">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500.
            </p>
            <Link to="/category/all">
              <button className="reveal">Place an Order</button>
            </Link>
            <div className="trustpilot reveal">
              <p className="asd">
                <Trustpilot />
                Trustpilot
              </p>

              <p className="reveal">
                <span className="numbers">4.8 out of 5</span> based on 2000+
                reviews
              </p>
            </div>
          </div>
          <div className="right reveal-right">
            <div className="background"></div>
            <img src={require("../../Assets/RockPS.png")} alt="Rock" />
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;

/*  //Works but other method is easier
  onScrollAnimation() {
    const topPosition = (element) => element.getBoundingClientRect().top;
    const div1Pos = topPosition(this.myRef.current);
    const div2Pos = topPosition(this.seconRef.current);
    const div3Pos = topPosition(this.thirdRef.current);
    // console.log(div1Pos, div2Pos, div3Pos);
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      // console.log(scrollPosition, "scroll");
      // console.log(scrollPosition - div2Pos)
      // console.log(scrollPosition - div3Pos < 50, scrollPosition - div2Pos);

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
  } */

/* arturo() {
    const hidden_elements = document.querySelectorAll(".reveal");

    function reveal() {
      for (let hidden of hidden_elements) {
        const elementTop = hidden.getBoundingClientRect().top;
        const distanceSlow = 150;
        const distanceQuick = 25;
        switch (hidden.classList.contains("reveal-quick")) {
          case true:
            if (elementTop < window.innerHeight - distanceQuick) {
              hidden.classList.add("active");
              setTimeout(() => hidden.classList.add("quick-animate"), 800);
            }
            break;
          default:
            if (elementTop < window.innerHeight - distanceSlow) {
              hidden.classList.add("active");
              setTimeout(() => hidden.classList.add("quick-animate"), 800);
            }
        }
      }
    }
    /* .reveal {
  transform: translateY(10rem);
  opacity: 0;
  transition: transform 0.8s ease-out, opacity 0.8s ease-out;
  &.active {
    transform: none;
    opacity: 1;
  }
} */
// window.addEventListener("scroll", reveal);
// }
