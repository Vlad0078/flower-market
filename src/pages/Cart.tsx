import Header from "@/components/Header";
import React, { useEffect, useState, type FormEventHandler } from "react";
import styles from "./Cart.module.scss";
import ClientAddressInfo from "@/components/ClientAddressInfo";
import { Button, Text, useMediaQuery } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import CartContent from "@/components/CartContent";
import { clearCart, useCartTotal, useStore } from "@/store/store";
import type Flower from "@/types/Flower";
import { fetchFlowersByIds, saveOrder } from "@/utils/api";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const [flowers, setFlowers] = useState<Flower[]>([]);

	const { cart } = useStore();
	const cartTotal = useCartTotal()

  const [isLargerThan440] = useMediaQuery(["(min-width: 440px)"]);

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    const name = String(formData.get("name"));
    const email = String(formData.get("email"));
    const phone = String(formData.get("phone"));
    const address = String(formData.get("address"));

    const cartItems = Object.values(cart);

    if (cartItems.length < 1) return;

    saveOrder(cartItems, name, email, phone, address).then((orderId) => {
      if (orderId) navigate(`/order/${orderId}`);
    });

    clearCart();
  };

  // * fetch flowers
  useEffect(() => {
    const flowerIds = Object.values(cart).map((item) => item.flowerId);

    fetchFlowersByIds(flowerIds).then((flowers) => {
      setFlowers(flowers ?? []);
    });
  }, [i18n.language, cart]);

  return (
    <div className="screen-container">
      <Header />
      <form className={styles["cart-form"]} onSubmit={(e) => submitHandler(e)}>
        <div className={"content-wrapper"}>
          <div className={"box-shadow"}></div>

          <div className={styles["address-info-wrapper"]}>
            <ClientAddressInfo />
          </div>
        </div>

        <div className={"content-wrapper"}>
          <div className={"box-shadow"}></div>

          <div className={styles["cart-content-wrapper"]}>
            <CartContent flowers={flowers} />
          </div>
        </div>

        <div className={styles["cart-form-footer"]}>
          <Text fontSize={isLargerThan440 ? "2xl" : "xl"} fontWeight={500}>
            {t("cart-form.total")}:{isLargerThan440 ? " " : <br />}
            {cartTotal} {t("currency.uah")}
          </Text>

          <Button
            type="submit"
            colorPalette={"green"}
            size={"xl"}
            fontSize={isLargerThan440 ? "2xl" : "xl"}
          >
            {t("cart-form.order-btn")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Cart;
