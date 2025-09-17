import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./StoreSearchBar.module.scss";
import { InputGroup, Input, CloseButton, ButtonGroup, Button } from "@chakra-ui/react";
import { setStoreSearchQuery, useStore } from "@/store/store";

const StoreSearchBar: React.FC = () => {
  const { t } = useTranslation();

  const { storeListOpen, storeLoadingStage } = useStore();

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

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStoreSearchQuery(query);
  };

  return (
    <div className={styles.searchbar}>
      <form
        className={`${styles["store-form"]} ${!storeListOpen ? styles.closed : ""}`}
        onSubmit={(e) => submitHandler(e)}
      >
        <InputGroup endElement={clearQueryBtn}>
          <Input
            ref={inputRef}
            placeholder={t("store.search-placeholder")}
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
            loading={storeLoadingStage === "loading"}
          >
            {t("search-form.search-btn")}
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default StoreSearchBar;
