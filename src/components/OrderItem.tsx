import { Image } from "@chakra-ui/react";
import React, { type HTMLAttributes } from "react";
import styles from "./OrderItem.module.scss";
import { useTranslation } from "react-i18next";

interface OrderItemProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  photo: string;
  price: number;
  qty: number;
}

const OrderItem: React.FC<OrderItemProps> = ({ name, photo, price, qty, ...rest }) => {
  const { t } = useTranslation();

  return (
    <div className={styles["order-item"]} {...rest}>
      <div className={styles["order-item__photo-wrapper"]}>
        <Image className={styles["order-item__photo"]} src={photo} alt={name} />
      </div>

      <div className={styles["order-item__info"]}>
        <h3 className={styles["order-item__title"]}>{name}</h3>

        <p className={styles["order-item__left-part"]}>
          {qty} x {price} {t("currency.uah")}
        </p>
      </div>
    </div>
  );
};

export default OrderItem;
