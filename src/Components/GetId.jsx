import { useParams } from "react-router-dom";
import ProductPage from "../Pages/productPage/productPage";

function GetId() {
  const { id } = useParams();

  return (
    <div>
      <ProductPage id={id} />
    </div>
  );
}

export default GetId;
