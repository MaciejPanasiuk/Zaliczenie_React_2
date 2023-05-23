import React, { useState } from "react";
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

function ProductsList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filteredProducts = useSelector(
    (state) => state.products.filteredProducts
  );
  const productloadingStatus = useSelector(
    (state) => state.products.productloadingStatus
  );
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
  return (
    <div className={commonColumnsStyles.AppColumn}>
      <header className={commonColumnsStyles.AppHeader}>
        <p>Products list</p>
        {filteredProducts.length > 0
          ? filteredProducts.map((product) => (
              <span
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
