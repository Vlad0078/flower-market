import React, { useEffect, useState } from "react";
import styles from "./FlowersGrid.module.scss";
import { setFavs, setFlowersLoadingStage, useStore } from "@/store/store";
import type Flower from "@/types/Flower";
import { fetchFavFlowerIds, fetchFlowers } from "@/utils/api";
import FlowerCard from "./FlowerCard";
import { useTranslation } from "react-i18next";

const FlowersGrid: React.FC = () => {
  const { t, i18n } = useTranslation();

  const {
    activeStoreId,
    flowerSearchQuery,
    flowersSortOption,
    flowersSortOrder,
    flowersLoadingStage,
  } = useStore();

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

        fetchFavFlowerIds().then((favIds) => {
          let sortedFlowers = flowers;

          if (favIds) {
            sortedFlowers = flowers.sort(
              (a, b) => Number(favIds.includes(b._id)) - Number(favIds.includes(a._id))
            );
            setFavs(favIds);
          }

          setFlowersLoadingStage("loaded");
          setFlowers(sortedFlowers);
        });
      }
    );
  }, [activeStoreId, i18n.language, flowerSearchQuery, flowersSortOption, flowersSortOrder]);

  return flowers.length > 0 ? (
    <section className={styles["flowers-grid"]}>
      {flowers.map((flower, index) => (
        <FlowerCard key={index} flower={flower} />
      ))}
    </section>
  ) : flowersLoadingStage === "loaded" || flowersLoadingStage === "failed" ? (
    <p className={styles["list-empty-text"]}>{t("stores.no-flowers-found")}</p>
  ) : null;
};

export default FlowersGrid;
