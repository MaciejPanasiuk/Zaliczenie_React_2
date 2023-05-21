import ProductsList from "../ProductsList/ProductsList";
import styles from "../../App.module.scss";
import ShoppingList from "../ShopingList/ShopingList";

function Dashboard() {
  return (
    <div className={styles.columnsWrapper}>
      <ProductsList />
      <ShoppingList />
    </div>
  );
}

export default Dashboard;