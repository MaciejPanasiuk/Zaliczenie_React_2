import React from "react";
import styles from "../../App.module.scss";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useRef } from "react";

function ProductDetails() {
  const navigate = useNavigate();
  const productDetails = useSelector((state) => state.products.productDetails);
  const detailsloadingStatus = useSelector(
    (state) => state.products.detailsloadingStatus
  );
  const delRef = useRef(null);
  useEffect(() => {
    changeFocusToHighlighted();
  }, [productDetails]);

  const changeFocusToHighlighted = () => {
    if (delRef.current !== null) {
      delRef.current.focus();
      // console.log("Focus set on ArrowBackIcon");
    }
    // console.log("ref is null");
  };
  const handleKeyClick = (event) => {
    if (event.key === "Backspace") {
      navigate("/products/list");
    }
  };
  return (
    <div className={styles.columnsWrapper}>
      <div className={commonColumnsStyles.App}>
        <header className={commonColumnsStyles.AppHeader}>
          <p> Product Details:</p>
          {detailsloadingStatus === "Loading" ? (
            <CircularProgress />
          ) : (
            <div>
              <ul style={{ listStyleType: "none" }}>
                <li>id: {productDetails?.id}</li>
                <li>name: {productDetails?.name}</li>
                <li>cathegory: {productDetails?.category}</li>
                <li>isFood: {String(productDetails?.isFood)}</li>
              </ul>
            </div>
          )}
          <ArrowBackIcon
            onClick={() => navigate("/products/list")}
            onKeyDown={(event) => handleKeyClick(event)}
            ref={delRef}
            tabIndex="0"
          />
        </header>
      </div>
    </div>
  );
}
export default ProductDetails;
