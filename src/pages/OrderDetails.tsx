import Header from "@/components/Header";
import type Order from "@/types/Order";
import { fetchOrderByOrderId } from "@/utils/api";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import styles from "./OrderDetails.module.scss";
import OrderItem from "@/components/OrderItem";

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [noPrivilegesError, setNoPrivilegesError] = useState(false);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (orderId)
      fetchOrderByOrderId(Number(orderId)).then((data) => {
        if (data?.order) {
          setOrder(data.order);
        } else if (data?.reason === "no privileges") {
          setNoPrivilegesError(true);
        }
        setLoading(false);
      });
  }, [orderId, i18n.language]);

  return (
    <div className="screen-container">
      <Header />

      <main className={styles.main}>
        <h1 className={styles["page-title"]}>{t("order-details-page.title")}</h1>

        <h2 className={styles["order-number"]}>
          {t("order-details-page.order")} #{orderId}
        </h2>

        {loading ? null : order ? (
          <div className={styles["order-info"]}>
            <div className={styles["order-items"]}>
              {order.items.map((item, index) => (
                <OrderItem
                  key={index}
                  name={item.flower.name}
                  photo={item.flower.photo[0]}
                  price={item.price}
                  qty={item.qty}
                />
              ))}
            </div>

            <hr className={styles.delimiter} />

            <div className={styles["order-details__footer"]}>
              <p className={styles["order-details__footer-prop"]}>
                {t("order-details-page.total")}:{" "}
              </p>

              <p className={styles["order-details__footer-value"]}>
                {order.total} {t("currency.uah")}
              </p>

              <p className={styles["order-details__footer-prop"]}>
                {t("order-details-page.delivery-address")}:{" "}
              </p>

              <p className={styles["order-details__footer-value"]}>{order.customerAddress}</p>

              <p className={styles["order-details__footer-prop"]}>
                {t("order-details-page.date")}:{" "}
              </p>

              <p className={styles["order-details__footer-value"]}>
                {Intl.DateTimeFormat(i18n.language, {
                  timeZone: order.customerTimezone,
                  dateStyle: "long",
                  timeStyle: "short",
                }).format(new Date(order.createdAt))}{" "}
              </p>
            </div>
          </div>
        ) : (
          <p className={styles["error-info"]}>
            {noPrivilegesError
              ? t("order-details-page.no-privileges")
              : t("order-details-page.wrong-order-id")}
          </p>
        )}
      </main>
    </div>
  );
};

export default OrderDetails;
