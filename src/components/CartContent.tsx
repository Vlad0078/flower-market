import { useStore } from "@/store/store";
import type Flower from "@/types/Flower";
import React, { type HTMLAttributes } from "react";
import CartItem from "./CartItem";
import styles from "./CartContent.module.scss";
import { useTranslation } from "react-i18next";

interface CartContentProps extends HTMLAttributes<HTMLDivElement> {
  flowers: Flower[];
}

const CartContent: React.FC<CartContentProps> = ({ flowers }) => {
	const {t} = useTranslation()

  const { cart } = useStore();

  return Object.keys(cart).length ? (
    <div className={styles["cart-content"]}>
      {Object.entries(cart).map((item) => {
        const flower = flowers.find((flower) => flower._id === item[1].flowerId);

        if (!flower) return null;

        return (
          <CartItem
            key={item[0]}
            id={item[0]}
            name={flower.name}
            photo={flower.photo[0]}
            price={flower.price}
            qty={item[1].qty}
          />
        );
      })}
    </div>
  ) : (
    <p className={styles["cart-empty-text"]}>{t("cart.cart-empty")}</p>
  );
};

export default CartContent;
