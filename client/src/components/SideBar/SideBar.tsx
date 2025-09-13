import style from "./SideBar.module.scss";
import { useEffect, useState } from "react";
import ShopCard from "../ShopCard/ShopCard";

type Shop = {
  id: number;
  name: string;
};

interface SideBarProps {
  activeShopId: number | null;
  setActiveShopId: (id: number) => void;
}

export default function SideBar({
  activeShopId,
  setActiveShopId,
}: SideBarProps) {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/shop")
      .then(res => res.json())
      .then(data => setShops(data));
  }, []);

  return (
    <div className={style.sideBar}>
      <div className={style.wrapper}>
        <h1 className={style.shops}>Shops:</h1>
        {shops.map(item => (
          <div className={style.shopsItem} key={item.id}>
            <ShopCard
              shop={item}
              isActive={activeShopId === item.id}
              onClick={() => setActiveShopId(item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
