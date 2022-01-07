import { useParams } from "react-router-dom";
import ProductPage from "../Pages/productPage/productPage";
import { useState, useEffect } from "react";
function GetId() {
  const [prodID, setProdID] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    setProdID(id);
  }, []);

  return (
    <div>
      <ProductPage id={prodID} />
    </div>
  );
}

export default GetId;
