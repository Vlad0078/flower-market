import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Header.module.scss";
import { Link } from "@chakra-ui/react";
import { RiArrowLeftLine } from "react-icons/ri";
import { toggleStoreList, useCartCounter } from "@/store/store";

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();

  const cartCounter = useCartCounter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.navigation}>
        <NavLink className={styles.navlink} to={"/"}>
          <Link as="button" onClick={() => toggleStoreList(true)}>
            {t("header.shop")}
          </Link>
        </NavLink>

        <div className={`${styles.delimiter} ${styles["hidden-on-small-screen"]}`}></div>

        <NavLink className={`${styles.navlink} ${styles["hidden-on-small-screen"]}`} to={"/cart"}>
          <Link as="button">{t("header.shopping-cart")}</Link>
          {cartCounter > 0 ? <span className={styles.counter}>{cartCounter}</span> : null}
        </NavLink>

        <div className={`${styles.delimiter} ${styles["hidden-on-large-screen"]}`}></div>

        <Link
          as="button"
          className={`${styles["menu-btn"]} ${styles["hidden-on-large-screen"]}`}
          onClick={() => setMenuOpen(true)}
        >
          {t("header-menu")}
        </Link>

        <div className={`${styles.menu} ${menuOpen ? styles["menu--open"] : ""}`}>
          <RiArrowLeftLine className={styles["close-btn"]} onClick={() => setMenuOpen(false)} />

          <NavLink
            className={({ isActive }) =>
              `${styles.navlink} ${styles["menu-item"]} ${isActive ? styles.active : ""}`
            }
            to={"/"}
            onClick={() => setMenuOpen(false)}
          >
            {t("header.shop")}
          </NavLink>

          <NavLink
            className={`${styles.navlink} ${styles["menu-item"]}`}
            to={"/cart"}
            onClick={() => setMenuOpen(false)}
          >
            {t("header.shopping-cart")}
            {cartCounter > 0 ? <span className={styles.counter}>{cartCounter}</span> : null}
          </NavLink>
        </div>
      </div>

      <div className={styles["lang-select"]}>
        <Link onClick={() => i18n.changeLanguage("en")}>EN</Link>

        <div className={styles.delimiter}></div>

        <Link onClick={() => i18n.changeLanguage("uk")}>UA</Link>
      </div>
    </header>
  );
};

export default Header;
