import "./getAttributes.styles.scss";

import React, { Component } from "react";

class GetAttributes extends Component {
  constructor(props) {
    super(props);
    this.state = { savedAttributes: [] };
  }
  render() {
    // this.setState({
    //   savedAttributes: {
    //     key: size.value,
    //     text: att.id,
    //   },

    const { item, savedAttributes } = this.state;
    return item.attributes?.map((att) => {
      console.log(att);
      return (
        <div>
          <p className="attribute">{att.name}</p>

          <div className="att-btn">
            {att.items.map((size, index) => {
              return (
                <button
                  value={size.value}
                  style={{ background: size.value, color: size.value }}
                  className="att-button"
                  key={index}
                  onClick={() =>
                    this.setState({
                      savedAttributes: [...savedAttributes, size.value],

                      errors: "",
                    })
                  }
                >
                  {size.value}
                </button>
              );
            })}
          </div>
        </div>
      );
    });
  }
}

//

export default GetAttributes;
