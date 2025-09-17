import React, { type HTMLAttributes } from "react";
import { Box, Button, Card, Image, Text } from "@chakra-ui/react";
import type Flower from "@/types/Flower";
import { useTranslation } from "react-i18next";
import styles from "./FlowerCard.module.scss";
import { addToCart, toggleFav, useStore } from "@/store/store";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface FlowerCardProps extends HTMLAttributes<HTMLDivElement> {
  flower: Flower;
}

const FlowerCard: React.FC<FlowerCardProps> = ({ flower, ...rest }) => {
  const { t } = useTranslation();

  const { favFlowerIds } = useStore();

  return (
    <div className={styles["card-wrapper"]} {...rest}>
      <Card.Root className={styles["card-root"]} overflow="hidden">
        <Image className={styles.photo} src={flower.photo[0]} alt={flower.name} />

        <Card.Body className={styles["card-body"]} gap="2">
          {/* ↓ Пустишка для розрахунку розмірів main-info ↓ */}
          <Box className={styles["dummy-main-info"]}>
            <Card.Title className={styles.title}>.</Card.Title>
            <Text>.</Text>
          </Box>

          <Box className={styles["card-info"]}>
            <Box className={styles["main-info"]}>
              <Card.Title className={styles.title}>{flower.name}</Card.Title>
              <Text>
                {flower.price} {t("currency.uah")}
              </Text>
            </Box>

            <Box className={styles["description-wrapper"]}>
              <Card.Description className={styles["card-description"]}>
                {flower.description}
              </Card.Description>
            </Box>
          </Box>
        </Card.Body>

        <Card.Footer className={styles["card-footer"]} gap="2">
          <Button variant="solid" onClick={() => addToCart(flower._id)}>
            {t("flower.add-to-cart")}
          </Button>
          <button
            className={styles.heart}
            onClick={() => {
              // setFav((state) => !state);
              toggleFav(flower._id);
            }}
          >
            {favFlowerIds.includes(flower._id) ? <FaHeart /> : <FaRegHeart />}
          </button>
        </Card.Footer>
      </Card.Root>
    </div>
  );
};

export default FlowerCard;
