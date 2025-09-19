import type Store from "@/types/Store";
import api from "../config/axios";
import type Flower from "@/types/Flower";
import type Order from "@/types/Order";
import type { AxiosResponse } from "axios";
import { setToken } from "@/store/store";
import axios from "axios";

// # auth
const authUser = async () => {
  try {
    const result = await api.post<object, AxiosResponse<{ token?: string }>>("/user/auth", {
      createGuest: true,
    });

    const token = result.data.token;

    if (result.status === 200) {
      if (token) {
        setToken(token);
        localStorage.setItem("token", token);
      }
    } else {
      console.error(`Server responded with status 1 ${result.status}:`, result.data);
    }
  } catch (error) {
    console.error(error);
  }
};

// # stores

interface StoreResponse {
  stores: Store[];
}

const fetchStores = async (query?: string) => {
  try {
    const result = await api.get<StoreResponse>("/store", { params: { query } });
    if (result.status === 200) {
      return result.data.stores;
    } else {
      console.error(`Server responded with status ${result.status}:`, result.data);
    }
  } catch (error) {
    console.error(error);
  }
};

// # flowers

interface FlowersResponse {
  flowers: Flower[];
}

const fetchFlowers = async (
  storeId: string,
  query?: string,
  sort?: "date" | "price",
  sortOrder?: -1 | 1
) => {
  try {
    const result = await api.get<FlowersResponse>("/flowers", {
      params: { storeId, query, sort, sortOrder },
    });

    if (result.status === 200) {
      return result.data.flowers;
    } else {
      console.error(`Server responded with status ${result.status}:`, result.data);
    }
  } catch (error) {
    console.error(error);
  }
};

const fetchFlowersByIds = async (ids: string[]) => {
  try {
    const result = await api.post<FlowersResponse>("/flowers/by-ids", { ids });

    if (result.status === 200) {
      return result.data.flowers;
    } else {
      console.error(`Server responded with status ${result.status}:`, result.data);
    }
  } catch (error) {
    console.error(error);
  }
};

// # orders

const saveOrder = async (
  orderItems: { flowerId: string; qty: number }[],
  name: string,
  email: string,
  phone: string,
  address: string
) => {
  try {
    const result = await api.post<{ orderId: string }>("/order/save", {
      orderItems,
      name,
      email,
      phone,
      address,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    if (result.status === 200) {
      return result.data.orderId;
    } else {
      console.error(`Server responded with status ${result.status}:`, result.data);
    }
  } catch (error) {
    console.error(error);
  }
};

interface OrderResponse {
  order: Order;
}

const fetchOrderByOrderId = async (orderId: number) => {
  try {
    const result = await api.get<OrderResponse>(`/order/order_${orderId}`);
    return { success: true, order: result.data.order };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        return { success: false, reason: "no privileges" };
      }
    }
  }
};

const addFlowerToFavs = async (id: string) => {
  try {
    const result = await api.post<{ orderId: string }>("/flowers/add-to-fav", { flowerId: id });

    if (result.status === 200) {
      return true;
    } else {
      console.error(`Server responded with status ${result.status}:`, result.data);
    }
  } catch (error) {
    console.error(error);
  }
};

const fetchFavFlowerIds = async () => {
  try {
    const result = await api.get<{ favoriteFlowers: string[] }>("/flowers/favs");

    if (result.status === 200) {
      return result.data.favoriteFlowers;
    } else {
      console.error(`Server responded with status ${result.status}:`, result.data);
    }
  } catch (error) {
    console.error(error);
  }
};

export {
  authUser,
  fetchStores,
  fetchFlowers,
  fetchFlowersByIds,
  saveOrder,
  fetchOrderByOrderId,
  addFlowerToFavs,
  fetchFavFlowerIds,
};
