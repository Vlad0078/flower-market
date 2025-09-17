import { Button, Card, Image, Input, Text, type BoxProps } from "@chakra-ui/react";
import React from "react";
import styles from "./CartItem.module.scss";
import { ImBin } from "react-icons/im";
import { useTranslation } from "react-i18next";
import { removeFromCart, setCartItemQty } from "@/store/store";

interface CartItemProps extends BoxProps {
  id: string; // key in cart
  name: string;
  photo: string;
  price: number;
  qty: number;
}

const CartItem: React.FC<CartItemProps> = ({ id, name, photo, price, qty, ...rest }) => {
  const { t } = useTranslation();

  return (
    <Card.Root className={styles["cart-item"]} {...rest}>
      <div className={styles["cart-item__photo-wrapper"]}>
        <Image className={styles["cart-item__photo"]} src={photo} alt={name} />
      </div>

      <Card.Body className={styles["cart-item__body"]}>
        <div className={styles["cart-item__header"]}>
          <Card.Title className={styles["cart-item__name"]}>{name}</Card.Title>
          <Text className={styles["cart-item__price"]}>
            {price} {t("currency.uah")}
          </Text>
        </div>

        <div className={styles["cart-item__footer"]}>
          <label htmlFor="qty" className={styles["cart-item__qty-label"]}>
            {t("cart.qty-label")}:
          </label>

          <Input
            className={styles["cart-item__qty-input"]}
            id="qty"
            name="qty"
            type="number"
            min={0}
            value={qty}
            onChange={(e) => setCartItemQty(id, Number(e.target.value))}
          />

          <Button
            className={styles["cart-item__trash-btn"]}
            variant={"ghost"}
            colorPalette={"red"}
            onClick={() => removeFromCart(id)}
          >
            <ImBin />
          </Button>
        </div>
      </Card.Body>
    </Card.Root>
  );
};

export default CartItem;
