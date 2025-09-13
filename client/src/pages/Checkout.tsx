import { useCart } from "../context/useCart";
import { useState } from "react";
import styles from "./Chekout.module.scss";

const API_URL = "https://flowerdeliveryapp-production.up.railway.app";
export default function Checkout() {
  const { items, totalPrice, updateQuantity } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const orderResponse = await fetch(`${API_URL}/api/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          deliveryAddress: form.address,
        }),
      });

      if (!orderResponse.ok) throw new Error("Ошибка при создании заказа");
      const order = await orderResponse.json();
      console.log(order);

      for (const item of items) {
        await fetch(`${API_URL}/api/order_item`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: order.orderId,
            productId: item.id,
            quantity: item.quantity,
            priceAtPurchase: item.price,
          }),
        });
      }

      alert("Заказ успешно оформлен!");
    } catch (err) {
      console.error("Ошибка при оформлении заказа:", err);
      alert("Что-то пошло не так, попробуйте снова.");
    }
  };

  return (
    <form className={styles.checkout} onSubmit={handleSubmit}>
      <div className={styles.form}>
        <h2>Checkout</h2>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })}
        />
        <button type="submit">Submit</button>
      </div>

      <div className={styles.cart}>
        <h3>Your cart:</h3>
        {items.map(item => (
          <div key={item.id} className={styles.item}>
            <img src={item.imageUrl} alt={item.name} />
            <span>{item.name}</span>
            <input
              type="number"
              value={item.quantity}
              min={1}
              onChange={e => updateQuantity(item.id, Number(e.target.value))}
            />
            <span>{item.price * item.quantity} UAH</span>
          </div>
        ))}

        <p className={styles.total}>Total: {totalPrice} UAH</p>
      </div>
    </form>
  );
}
