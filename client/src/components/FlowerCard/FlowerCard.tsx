import React from "react";
import styles from "./FlowerCard.module.scss";

interface ProductCardProps {
  name: string;
  imageUrl: string;
  price: number;
  onAddToCart: () => void;
}

const FlowerCard: React.FC<ProductCardProps> = ({
  name,
  imageUrl,
  price,
  onAddToCart,
}) => {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={name} className={styles.image} />
      <h3 className={styles.title}>{name}</h3>
      <div className={styles.section}>
        <p className={styles.price}>{price} tugrikov</p>
        <button className={styles.btn} onClick={onAddToCart}>
          add to Cart
        </button>
      </div>
    </div>
  );
};

export default FlowerCard;
