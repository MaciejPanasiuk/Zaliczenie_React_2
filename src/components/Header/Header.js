import React from "react";
import styles from "../../common/styles/Headers.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Button } from "@mui/material";
import { loadProducts, loadShoppingList } from "../../redux/productsSlice";
import { filterProducts } from "../../redux/productsSlice";
import axios from "axios";

function Header(props) {
  const currentUser = JSON.parse(window.localStorage.getItem("user"));
  const searchFilter = useSelector((state) => state.products.searchFilter);

  const dispatch = useDispatch();

  const getProductsFromAPI = async (path) => {
    try {
      const resProducts = await axios.get(`http://localhost:9000/${path}`);
      dispatch(loadProducts(resProducts.data));
      dispatch(filterProducts(searchFilter));
      const resShoppingList = await axios.get(
        `http://localhost:9000/products/shoppingList`
      );
      dispatch(loadShoppingList(resShoppingList.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.signedUserInfo}>
        <Typography sx={{ m: 2 }} variant="h5">
          Zalogowany:{" "}
          {`${currentUser.userfirstName} ${currentUser.userLastName}`}
        </Typography>
        <Button
          variant="contained"
          onClick={() => getProductsFromAPI("products")}
        >
          Załaduj produkty
        </Button>
        <Link to="/">
          <Button variant="contained" color="error">
            Wyloguj
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
