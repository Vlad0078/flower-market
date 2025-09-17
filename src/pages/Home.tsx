import Header from "@/components/Header";
import StoreList from "@/components/StoreList";
import React from "react";
import FlowersGrid from "@/components/FlowersGrid";
import styles from "./Home.module.scss";
import FlowerSearchBar from "@/components/FlowerSearchBar";

const Home: React.FC = () => {
  return (
    <div className="screen-container">
      <Header />

      <main className={styles.main}>
        <StoreList />

        <div className={styles["flowers-catalog-wrapper"]}>
          <FlowerSearchBar />

          <div className={`${styles["flowers-grid-wrapper"]} content-wrapper`}>
            <div className={"box-shadow"}></div>
            <FlowersGrid />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
