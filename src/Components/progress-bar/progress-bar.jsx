import React from "react";
import { useParams } from "react-router-dom";

import "./progress-bar.styles.scss";

export default function ProgressBar() {
  const { param } = useParams;
  console.log(param);
  return <div>ProgressBar</div>;
}
