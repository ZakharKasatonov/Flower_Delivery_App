import React, { useEffect, useState } from "react";
import FlowerCard from "../FlowerCard/FlowerCard";
import styles from "./FlowerItems.module.scss";
import { useCart } from "../../context/useCart";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  shopId: number;
}

interface FlowerItemsProps {
  activeShopId: number | null;
}

const FlowerItems: React.FC<FlowerItemsProps> = ({ activeShopId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  useEffect(() => {
    fetch("http://localhost:5000/api/product")
      .then(res => res.json())
      .then(data => setProducts(data.rows));
  }, []);

  const filteredProducts = activeShopId
    ? products.filter(p => p.shopId === activeShopId)
    : products;

  return (
    <div className={styles.page}>
      {filteredProducts.map(p => (
        <FlowerCard
          key={p.id}
          name={p.name}
          price={p.price}
          imageUrl={`http://localhost:5000/${p.imageUrl}`}
          onAddToCart={() =>
            addToCart({
              id: p.id,
              name: p.name,
              imageUrl: `http://localhost:5000/${p.imageUrl}`,
              price: p.price,
            })
          }
        />
      ))}
    </div>
  );
};
export default FlowerItems;
