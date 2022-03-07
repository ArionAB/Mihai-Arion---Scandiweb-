import React from "react";
import { Link } from "react-router-dom";

import "./progress-bar.styles.scss";

export default function ProgressBar({ billing }) {
  return (
    <div className="progress">
      <div className="checked">
        &#10003;{" "}
        <Link className="link" to="/category/all">
          Orders
        </Link>
      </div>

      <span className="checked-bar"></span>
      {billing ? (
        <>
          <div className="not-checked">
            2
            <Link className="link" to="/checkout">
              Billing Address
            </Link>
          </div>

          <span className="not-checked-bar"></span>
        </>
      ) : (
        <>
          <div className="checked">
            &#10003;{" "}
            <Link className="link" to="/checkout">
              Billing Address
            </Link>
          </div>
          <span className="checked-bar"></span>
        </>
      )}
      <div className="not-checked">
        3{" "}
        <Link className="link" to="/confirmation">
          Payment
        </Link>
      </div>

      <span className="not-checked-bar"></span>
      <div className="not-checked">
        4{" "}
        <Link className="link" to="/order">
          Your order
        </Link>
      </div>
    </div>
  );
}
