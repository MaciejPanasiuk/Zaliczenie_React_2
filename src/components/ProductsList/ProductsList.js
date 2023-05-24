import React, { useState, useEffect, useRef } from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  loadShoppingList,
  setProductLoadingState,
  setDetailsLoadingState,
  loadDetails,
} from "../../redux/productsSlice";
import { CircularProgress } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import styles from "./ProductsList.module.scss";
import { debounce } from "lodash";

function ProductsList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refproduct = useRef(null);
  const filteredProducts = useSelector(
    (state) => state.products.filteredProducts
  );
  const productloadingStatus = useSelector(
    (state) => state.products.productloadingStatus
  );
  const [addedItemId, setaddedItemId] = useState(0);
  const [highlightedProductdIndex, sethighlightedProductdIndex] = useState(0);

  // useEffect(() => {
  //   changeFocusToHighlighted();
  // }, [filteredProducts, highlightedProductdIndex]);
  useEffect(() => {
    changeFocusToHighlighted();
  }, [highlightedProductdIndex]);
  useEffect(() => {
    const delayedChangeFocus = debounce(changeFocusToHighlighted, 1500);
    delayedChangeFocus();
    return () => {
      delayedChangeFocus.cancel();
    };
  }, [filteredProducts]);

  const changeFocusToHighlighted = () => {
    if (refproduct.current !== null) {
      // console.log("ref works");
      refproduct.current.focus();
    }
  };
  const handleItemClick = async (product) => {
    try {
      setaddedItemId(product.id);
      const newProduct = { ...product };
      newProduct.id = uuidv4();
      dispatch(setProductLoadingState(`AddingItem`));
      await axios.post(
        `http://localhost:9000/products/shoppingList/new`,
        newProduct
      );
      const resShoppingList = await axios.get(
        `http://localhost:9000/products/shoppingList`
      );
      dispatch(loadShoppingList(resShoppingList.data));
      dispatch(setProductLoadingState("Success"));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickForDetails = async (product) => {
    try {
      dispatch(setDetailsLoadingState(`Loading`));
      navigate(`/products/details/${product.id}`);
      const resDetails = await axios.get(
        `http://localhost:9000/products/${product.id}`
      );
      dispatch(loadDetails(resDetails.data));
      dispatch(setDetailsLoadingState(`Success`));
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (event, product, listLength) => {
    if (event.key === "ArrowUp" && highlightedProductdIndex > 0) {
      sethighlightedProductdIndex(highlightedProductdIndex - 1);
    } else if (
      event.key === "ArrowDown" &&
      highlightedProductdIndex < listLength - 1
    ) {
      sethighlightedProductdIndex(highlightedProductdIndex + 1);
    } else if (event.key === "d") {
      handleClickForDetails(product);
    }
  };
  return (
    <div className={commonColumnsStyles.AppColumn}>
      <header className={commonColumnsStyles.AppHeader}>
        <p> Products list</p>
        {filteredProducts.length > 0
          ? filteredProducts.map((product, index) => (
              <span
                key={product.name + "_pr"}
                ref={highlightedProductdIndex === index ? refproduct : null}
                className={
                  highlightedProductdIndex === index ? styles.highlighted : {}
                }
                tabIndex="0"
                onKeyDown={(event) =>
                  handleKeyDown(event, product, filteredProducts.length)
                }
                onClick={() => handleItemClick(product)}
                onContextMenu={(event) => {
                  event.preventDefault();
                  handleClickForDetails(product);
                }}
              >
                {" "}
                {product.id} {product.name}{" "}
                {productloadingStatus === "AddingItem" &&
                addedItemId === product.id ? (
                  <CircularProgress />
                ) : (
                  ""
                )}
              </span>
            ))
          : "brak produktów do wyświetlenia"}
      </header>
    </div>
  );
}

export default ProductsList;
