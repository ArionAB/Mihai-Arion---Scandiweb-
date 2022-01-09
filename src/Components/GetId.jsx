import { useParams } from "react-router-dom";
import ProductPage from "../Pages/productPage/productPage";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setProdID } from "../Redux/productID/productID.actions";

function GetId() {
  const [prodID, setProdID] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    setProdID(id);
  }, []);

  return (
    <div>
      <ProductPage />
    </div>
  );
}
const mapStateToProps = ({ prodID }) => {
  console.log(prodID);
};

const mapDispatchToProps = (dispatch) => ({
  setProdID: (id) => dispatch(setProdID(id)),
});

export default connect(null, mapDispatchToProps)(GetId);
