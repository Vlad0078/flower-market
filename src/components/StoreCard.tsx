import React from "react";
import styles from "./StoreCard.module.scss";
import { type BoxProps, Card, Image } from "@chakra-ui/react";

interface StoreCardProps extends BoxProps {
  _id: string;
  name: string;
  photo: string;
  address: string;
  active?: boolean;
}

const StoreCard: React.FC<StoreCardProps> = ({ name, photo, address, active = false, ...rest }) => {
  return (
    <Card.Root className={`${styles.store} ${active ? styles["store--active"] : ""}`} {...rest}>
      <div className={styles["store__photo-wrapper"]}>
        <Image className={styles.store__photo} src={photo} alt={name} />
      </div>

      <Card.Title className={styles.store__name}>{name}</Card.Title>

      <Card.Description className={styles.store__address}>{address}</Card.Description>
    </Card.Root>
  );
};

export default StoreCard;
