import {useEffect, useState} from "react";
import styles from "./itemIcon.module.css";
export const ItemIcon = ({onClick,icon,quantity}) => {

  const [quantityState,setQuantityState] = useState(quantity);


  const handleQuantity = (quantity) => {
    if(quantity === 0){
      return null;
    }
    if(quantity > 0 && quantity < 10){
      setQuantityState(quantity)
    }
    if(quantity >= 10){
      setQuantityState("9+")
    }
  }

  useEffect(() => {
    handleQuantity(quantity)
  },[quantity])

  return (
    <li onClick={onClick} className={styles.li}>
      <div>
      {icon}
      </div>
      <div className={styles.wishItems}>{
        quantityState === 0 ? null : quantityState
      }</div>
    </li>
  );
  
};
