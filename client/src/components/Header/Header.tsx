import style from "./Header.module.scss";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className={style.header}>
      <div className={style.wrapper}>
        <div className={style.navBtns}>
          <Link to="/">Home</Link> | <Link to="/checkout">Shoping Cart </Link>
        </div>
        <div className={style.sortBtns}>
          <a href="">
            <button className={style.sortByPrice}>Sort by price</button>
          </a>
          <a href="">
            <button className={style.sortByDate}>Sort by date</button>
          </a>
        </div>
      </div>
    </header>
  );
}
