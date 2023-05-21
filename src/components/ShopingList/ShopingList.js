import React, { useState } from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  loadShoppingList,
  setProductLoadingState,
} from "../../redux/productsSlice";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function ShoppingList() {
  const shoppingList = useSelector((state) => state.products.shoppingList);
  const loadingStatus = useSelector((state) => state.products.loadingStatus);
  const [deletedItemId, setdeletedItemId] = useState(0);
  const dispatch = useDispatch();

  const handleItemClick = async (product) => {
    try {
      setdeletedItemId(product.id);
      dispatch(setProductLoadingState("RemovingItem"));
      await axios.delete(
        `http://localhost:9000/products/shoppingList/${product.id}`
      );
      const resShoppingList = await axios.get(
        `http://localhost:9000/products/shoppingList`
      );
      dispatch(loadShoppingList(resShoppingList.data));
      dispatch(setProductLoadingState("success"));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={commonColumnsStyles.App}>
      <header className={commonColumnsStyles.AppHeader}>
        <p>Shopping List</p>
        {shoppingList.length > 0
          ? shoppingList.map((product, index) => (
              <span onClick={() => handleItemClick(product, index)}>
                {" "}
                {index + 1} {product.name}{" "}
                {loadingStatus === "RemovingItem" &&
                deletedItemId === product.id ? ( //needs a fix, to id or something else
                  <CircularProgress />
                ) : (
                  ""
                )}
              </span>
            ))
          : "koszyk jest pusty!"}
      </header>
    </div>
  );
}

export default ShoppingList;
