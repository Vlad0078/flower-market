import React, { useEffect, useState } from "react";
import styles from "./StoreList.module.scss";
import StoreCard from "./StoreCard";
import { useTranslation } from "react-i18next";
import { fetchStores } from "@/utils/api";
import type Store from "@/types/Store";
import { setActiveStore, setStoreLoadingStage, toggleStoreList, useStore } from "@/store/store";
import StoreSearchBar from "./StoreSearchBar";
import { useMediaQuery } from "@chakra-ui/react";

const StoreList: React.FC = () => {
  const { t, i18n } = useTranslation();

  const { activeStoreId, storeListOpen, storeSearchQuery } = useStore();

  const [isLargerThan768] = useMediaQuery(["(min-width: 768px)"]);

  const [stores, setStores] = useState<Store[]>([]);

  // * fetch stores
  useEffect(() => {
    setStoreLoadingStage("loading");

    fetchStores(storeSearchQuery).then((stores) => {
      if (!stores) {
        setStoreLoadingStage("failed");
        setStores([]);
        return;
      }

      setStoreLoadingStage("loaded");
      setStores(stores);
    });
  }, [i18n.language, storeSearchQuery]);

  return (
    <div className={styles["drawer-wrapper"]}>
      <StoreSearchBar />

      <div className={styles["drawer-main"]}>
        <div className={`${styles["stores-wrapper"]} content-wrapper`}>
          <div className={`${styles["stores-box-shadow"]} box-shadow`}></div>

          <section className={`${styles["store-list"]} ${!storeListOpen ? styles["closed"] : ""}`}>
            {stores.map((store, index) => (
              <StoreCard
                key={index}
                _id={store._id}
                name={store.name}
                photo={store.photo}
                address={store.address}
                active={store._id === activeStoreId}
                onClick={() => {
                  setActiveStore(store._id);
                  if (!isLargerThan768) toggleStoreList(false);
                }}
              />
            ))}
          </section>
        </div>

        <button className={styles["hide-btn"]} onClick={() => toggleStoreList()}>
          {storeListOpen ? t("stores.hide-stores-btn") : t("stores.show-stores-btn")}
        </button>
      </div>
    </div>
  );
};

export default StoreList;
