import React, { useState } from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  loadShoppingList,
  setProductLoadingState,
} from "../../redux/productsSlice";
import { CircularProgress } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

function ProductsList() {
  const productsList = useSelector((state) => state.products.productsList);
  const loadingStatus = useSelector((state) => state.products.loadingStatus);
  const dispatch = useDispatch();
  const [addedItemId, setaddedItemId] = useState(0);

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
      dispatch(setProductLoadingState("success"));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={commonColumnsStyles.AppColumn}>
      <header className={commonColumnsStyles.AppHeader}>
        <p>Products list</p>
        {productsList.length > 0
          ? productsList.map((product) => (
              <span onClick={() => handleItemClick(product)}>
                {" "}
                {product.id} {product.name}{" "}
                {loadingStatus === "AddingItem" &&
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
{
  /* Poniżej znajduje się ostylowany aktywny produkt do zadania 5 */
}
{
  /* <span
          style={{
            backgroundColor: "white",
            border: "1px black solid",
            borderRadius: "16px",
            padding: "6px",
          }}
        >
          Przykładowy aktywny produkt
        </span> */
}
