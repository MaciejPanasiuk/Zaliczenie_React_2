import React from "react";
import styles from "../../App.module.scss";
import ProductsList from "../ProductsList/ProductsList";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ProductDetails() {
  const navigate = useNavigate();
  const productDetails = useSelector((state) => state.products.productDetails);
  const detailsloadingStatus = useSelector(
    (state) => state.products.detailsloadingStatus
  );

  return (
    <div className={styles.columnsWrapper}>
      <ProductsList />
      <div className={commonColumnsStyles.App}>
        <header className={commonColumnsStyles.AppHeader}>
          <p>Product Details:</p>
          {detailsloadingStatus === "Loading" ? (
            <CircularProgress />
          ) : (
            <div>
              <ul style={{ "list-style-type": "none" }}>
                <li>id: {productDetails.id}</li>
                <li>name: {productDetails.name}</li>
                <li>cathegory: {productDetails.category}</li>
                <li>isFood: {String(productDetails.isFood)}</li>
              </ul>
              <ArrowBackIcon onClick={() => navigate("/products/list")} />
            </div>
          )}
        </header>
      </div>
    </div>
  );
}
export default ProductDetails;
