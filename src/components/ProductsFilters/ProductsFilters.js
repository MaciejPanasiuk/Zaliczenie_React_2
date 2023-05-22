import React from "react";
import styles from "../../common/styles/Headers.module.scss";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts, showOnlyFood } from "../../redux/productsSlice";

function ProductsFilters() {
  const [searchPhrase, setsearchPhrase] = useState("");
  const [isOnlyFood, setisOnlyFood] = useState(false);
  const FilterPhraseFromState = useSelector(
    (state) => state.products.searchFilter
  );
  const dispatch = useDispatch();
  const handleSearchPhraseChange = (event) => {
    setsearchPhrase(event.target.value);
    dispatch(filterProducts(event.target.value));
  };
  const handleOnlyFoodChecked = (event) => {
    setisOnlyFood(event.target.checked);
    if (event.target.checked) {
      dispatch(showOnlyFood(true));
      dispatch(filterProducts(FilterPhraseFromState));
    } else {
      dispatch(showOnlyFood(false));
      dispatch(filterProducts(FilterPhraseFromState));
    }
  };

  return (
    <div className={styles.filtersHeaderWrapper}>
      <Typography variant="h4">Filtruj produkty: </Typography>
      <FormGroup>
        <div className={styles.filtersForm}>
          <FormControlLabel
            control={
              <TextField
                margin="dense"
                label="Nazwa"
                variant="outlined"
                value={searchPhrase}
                onChange={handleSearchPhraseChange}
              />
            }
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Tylko produkty spożywcze"
            value={isOnlyFood}
            onChange={handleOnlyFoodChecked}
          />
        </div>
      </FormGroup>
    </div>
  );
}

export default ProductsFilters;
