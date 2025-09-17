import type Flower from "./Flower";

type OrderStatus =
  | "created"
  | "paid"
  | "ready-to-ship"
  | "shipping"
  | "shipped"
  | "received"
  | "cancelled";

export default interface Order {
  orderId: number;
  userId: string;
  items: { flower: Flower; qty: number; price: number }[];
  total: number;
  status: OrderStatus;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  customerTimezone: string;
  createdAt: Date;
  updatedAt: Date;
}
