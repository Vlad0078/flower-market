import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./FlowerSearchBar.module.scss";
import { InputGroup, Input, CloseButton, ButtonGroup, Button, Text } from "@chakra-ui/react";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import {
  setFlowerSearchQuery,
  setFlowersSortOption,
  toggleFlowersSortDecs,
  useStore,
} from "@/store/store";

const FlowerSearchBar: React.FC = () => {
  const { t } = useTranslation();

  const { flowersLoadingStage, flowersSortOption, flowersSortOrder } = useStore();

  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const clearQueryBtn = query ? (
    <CloseButton
      size="xs"
      onClick={() => {
        setQuery("");
        inputRef.current?.focus();
      }}
      me="-2"
    />
  ) : undefined;

  const toggleSort = (newSortOption: "price" | "date") => {
    if (newSortOption === flowersSortOption) {
      toggleFlowersSortDecs();
    } else {
      setFlowersSortOption(newSortOption);
      toggleFlowersSortDecs(newSortOption === "date" ? -1 : 1);
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFlowerSearchQuery(query);
  };

  return (
    <div className={styles.searchbar}>
      <form
        className={styles["flower-form"]}
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <div className={styles["serch-wrapper"]}>
          <InputGroup className={styles["flower-input"]} endElement={clearQueryBtn}>
            <Input
              ref={inputRef}
              placeholder={t("flower.search-placeholder")}
              value={query}
              onChange={(e) => {
                setQuery(e.currentTarget.value);
              }}
            />
          </InputGroup>

          <ButtonGroup colorPalette="green">
            <Button
              type="submit"
              loadingText={t("loading")}
              spinnerPlacement="end"
              loading={flowersLoadingStage === "loading"}
            >
              {t("search-form.search-btn")}
            </Button>
          </ButtonGroup>
        </div>

        <div className={styles["sort-options"]}>
          <Button
            className={`${styles["sort-option"]} ${
              flowersSortOption === "price" ? styles["sort-option--active"] : ""
            }`}
            variant="plain"
            onClick={() => toggleSort("price")}
          >
            <Text className={`${styles["sort-option-text"]}`}>{t("sort-options.price")}</Text>
            <Text className={`${styles["sort-option-text"]} ${styles["sort-option-text--short"]}`}>
              {t("sort-options.price--short")}
            </Text>{" "}
            {flowersSortOption === "price" &&
              (flowersSortOrder === 1 ? <RiArrowUpSLine /> : <RiArrowDownSLine />)}
          </Button>

          <Button
            className={`${styles["sort-option"]} ${
              flowersSortOption === "date" ? styles["sort-option--active"] : ""
            }`}
            variant="plain"
            onClick={() => toggleSort("date")}
          >
            <Text className={`${styles["sort-option-text"]}`}>{t("sort-options.date")}</Text>
            <Text className={`${styles["sort-option-text"]} ${styles["sort-option-text--short"]}`}>
              {t("sort-options.date--short")}
            </Text>{" "}
            {flowersSortOption === "date" &&
              (flowersSortOrder === 1 ? <RiArrowUpSLine /> : <RiArrowDownSLine />)}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FlowerSearchBar;
