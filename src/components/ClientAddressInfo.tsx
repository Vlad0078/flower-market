import { Field, Input } from "@chakra-ui/react";
import React, { useState, type HTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import styles from "./ClientAddressInfo.module.scss";

type ClientAddressInfoProps = HTMLAttributes<HTMLDivElement>;

const ClientAddressInfo: React.FC<ClientAddressInfoProps> = ({ ...rest }) => {
  const { t } = useTranslation();

  const [invalidName, setInvalidName] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [invalidAddress, setInvalidAddress] = useState(false);

  return (
    <div className={styles["address-info"]} {...rest}>
      <Field.Root invalid={invalidName}>
        <Field.Label>{t("cart-form.name")}</Field.Label>
        <Input
          name="name"
          type="text"
          required
          placeholder={t("cart-form.name-placeholder")}
          onBlur={(e) => setInvalidName(!e.target.checkValidity())}
          onChange={(e) => e.target.checkValidity() && setInvalidName(false)}
        />
        <Field.ErrorText>{t("cart-form.invalid-name")}</Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={invalidEmail}>
        <Field.Label>{t("cart-form.email")}</Field.Label>
        <Input
          name="email"
          type="email"
          required
          placeholder="example@mail.com"
          onBlur={(e) => setInvalidEmail(!e.target.checkValidity())}
          onChange={(e) => e.target.checkValidity() && setInvalidEmail(false)}
        />
        <Field.ErrorText>{t("cart-form.invalid-email")}</Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={invalidPhone}>
        <Field.Label>{t("cart-form.phone")}</Field.Label>
        <Input
          name="phone"
          type="text"
					required
					pattern="^[0-9+\-\(\) ]*$"
          placeholder="+380 00 000 0000"
          onBlur={(e) => setInvalidPhone(!e.target.checkValidity())}
          onChange={(e) => e.target.checkValidity() && setInvalidPhone(false)}
        />
        <Field.ErrorText>{t("cart-form.invalid-phone")}</Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={invalidAddress}>
        <Field.Label>{t("cart-form.address")}</Field.Label>
        <Input
          name="address"
          type="text"
					required
					minLength={10}
          placeholder={t("cart-form.address-placeholder")}
          onBlur={(e) => setInvalidAddress(!e.target.checkValidity())}
          onChange={(e) => e.target.checkValidity() && setInvalidAddress(false)}
        />
        <Field.ErrorText>{t("cart-form.invalid-address")}</Field.ErrorText>
      </Field.Root>
    </div>
  );
};

export default ClientAddressInfo;
