import style from "./ShopCard.module.scss";
type Shop = {
  id: number;
  name: string;
};

type ShopCardProps = {
  shop: Shop;
  isActive: boolean;
  onClick: () => void;
};

export default function ShopCard({ shop, isActive, onClick }: ShopCardProps) {
  return (
    <div onClick={onClick} className={isActive ? style.cardActive : style.card}>
      {shop.name}
    </div>
  );
}
