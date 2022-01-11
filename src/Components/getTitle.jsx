import { useParams } from "react-router-dom";

import All from "../Pages/Homepage/All/all";

function GetTitle() {
  const { title } = useParams();

  return (
    <div>
      <All title={title} />
    </div>
  );
}

export default GetTitle;
