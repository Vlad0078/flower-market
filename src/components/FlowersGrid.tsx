import React, { useEffect, useState } from "react";
import styles from "./FlowersGrid.module.scss";
import { setFlowersLoadingStage, useStore } from "@/store/store";
import type Flower from "@/types/Flower";
import { fetchFlowers } from "@/utils/api";
import FlowerCard from "./FlowerCard";
import { useTranslation } from "react-i18next";

const FlowersGrid: React.FC = () => {
  const { i18n } = useTranslation();

  const { activeStoreId, flowerSearchQuery, flowersSortOption, flowersSortOrder } = useStore();

  const [flowers, setFlowers] = useState<Flower[]>([]);

  // * fetch flowers
  useEffect(() => {
    if (!activeStoreId) return;

    setFlowersLoadingStage("loading");

    fetchFlowers(activeStoreId, flowerSearchQuery, flowersSortOption, flowersSortOrder).then(
      (flowers) => {
        if (!flowers) {
          setFlowersLoadingStage("failed");
          setFlowers([]);
          return;
        }

        // fetchFavFlowerIds().then((favIds) => {
        //   setFlowersLoadingStage("loaded");
        //   setFavs(favIds);
        //   setFlowers(flowers);
        // });

        setFlowersLoadingStage("loaded");
        setFlowers(flowers);
      }
    );
  }, [activeStoreId, i18n.language, flowerSearchQuery, flowersSortOption, flowersSortOrder]);

  return (
    <section className={styles["flowers-grid"]}>
      {flowers.map((flower, index) => (
        <FlowerCard key={index} flower={flower} />
      ))}
    </section>
  );
};

export default FlowersGrid;
