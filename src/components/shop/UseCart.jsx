// useCart.ts
import { useEffect, useState } from "react";
import { fetch_cart } from "../../services/shop/cart";

export function useCart() {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch_cart().then((res) => {
      const items = Object.entries(res.cart).map(([key, v]) => ({
        id: key,
        item_id: v.item_id ?? v.id ?? null,
        product_id: v.product_id,
        name: v.name,
        quantity: v.quantity,
        price: v.price,
        slug: v.slug,
        image: v.image || "/placeholder.jpg",
        subtotal: v.price * v.quantity,
        preview: v.preview,
      }));
      setCart(items);
      setTotalItems(res.total_items);
      setTotalPrice(res.total_price);
      setLoading(false);
    });
  }, []);

  return { cart, totalItems, totalPrice, loading, setCart, setTotalItems, setTotalPrice };
}
