import { addFlowerToFavs } from "@/utils/api";
import { create } from "zustand";

type LoadingStage = "initial" | "loading" | "loaded" | "failed";

type Cart = Record<string, { flowerId: string; qty: number }>;

type State = {
  storeListOpen: boolean;
  activeStoreId?: string;
  storeSearchQuery?: string;
  flowerSearchQuery?: string;
  storeLoadingStage: LoadingStage;
  flowersLoadingStage: LoadingStage;
  flowersSortOption: "price" | "date";
  flowersSortOrder: -1 | 1;
  cart: Cart;
  favFlowerIds: string[];
};

// * INITIAL
const initialState: State = {
  storeListOpen: true,
  storeLoadingStage: "initial",
  flowersLoadingStage: "initial",
  flowersSortOption: "date",
  flowersSortOrder: -1,
  cart: (() => {
    const localCart = localStorage.getItem("cart");
    // console.log();

    return localCart ? JSON.parse(localCart).cart : {};
  })(),
  favFlowerIds: [],
};

// * STORE
const useStore = create<State>(() => initialState);

// # ************* ACTIONS ************* # //

const setActiveStore = (storeId: string) =>
  useStore.setState({
    activeStoreId: storeId,
  });

const toggleStoreList = (open?: boolean) =>
  useStore.setState((state) => ({
    storeListOpen: open === undefined ? !state.storeListOpen : open,
  }));

const setStoreSearchQuery = (query?: string) =>
  useStore.setState({
    storeSearchQuery: query,
  });

const setFlowerSearchQuery = (query?: string) =>
  useStore.setState({
    flowerSearchQuery: query,
  });

const setStoreLoadingStage = (stage: LoadingStage) =>
  useStore.setState({
    storeLoadingStage: stage,
  });

const setFlowersLoadingStage = (stage: LoadingStage) =>
  useStore.setState({
    flowersLoadingStage: stage,
  });

const setFlowersSortOption = (sort: "price" | "date") =>
  useStore.setState({
    flowersSortOption: sort,
  });

const toggleFlowersSortDecs = (sortOrder?: -1 | 1) => {
  useStore.setState((state) => ({
    flowersSortOrder:
      sortOrder === undefined ? ((-1 * state.flowersSortOrder) as -1 | 1) : sortOrder,
  }));
};

// # ************* CART ACTIONS ************* # //

const addToCart = (flowerId: string) =>
  useStore.setState((state) => {
    const cartItem = Object.entries(state.cart).find(([, value]) => value.flowerId === flowerId);

    const cartKeys = Object.keys(state.cart);
    const lastCartKey = cartKeys[cartKeys.length - 1] ?? 0;

    const cartItemKey = cartItem ? cartItem[0] : Number(lastCartKey) + 1 + "";

    const qty = cartItem ? cartItem[1].qty + 1 : 1;

    const updatedCart = {
      cart: { ...state.cart, [cartItemKey]: { qty, flowerId } },
    };

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    return updatedCart;
  });

const removeFromCart = (id: string) =>
  useStore.setState((state) => {
    const updatedCart = { ...state.cart };
    delete updatedCart[id];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    return { cart: updatedCart };
  });

const setCartItemQty = (id: string, qty: number) =>
  useStore.setState((state) => {
    const cartItemCopy = { ...state.cart[id], qty: Math.max(1, qty) };

    const updatedCart = {
      cart: {
        ...state.cart,
        [id]: cartItemCopy,
      },
    };

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    return updatedCart;
  });

const incrementCartItemQty = (id: string) => {
  const itemQty = useStore.getState().cart[id].qty;
  setCartItemQty(id, itemQty + 1);
};

const decrementCartItemQty = (id: string) => {
  const itemQty = useStore.getState().cart[id].qty;
  setCartItemQty(id, itemQty - 1);
};

const useCartTotalQty = () =>
  useStore((state) => Object.values(state.cart).reduce((sum, item) => sum + item.qty, 0));

const clearCart = () =>
  useStore.setState(() => {
    localStorage.removeItem("cart");
    return { cart: {} };
  });

// #favs

const toggleFav = (flowerId: string) =>
  useStore.setState((state) => {
    const isFav = state.favFlowerIds.includes(flowerId);

    const updatedFavs = isFav
      ? state.favFlowerIds.filter((id) => id !== flowerId)
      : [...state.favFlowerIds, flowerId];

    addFlowerToFavs(flowerId);
    return { favFlowerIds: updatedFavs };
  });

const setFavs = (favFlowerIds: string[]) => useStore.setState({ favFlowerIds });

export {
  useStore,
  setActiveStore,
  toggleStoreList,
  setStoreSearchQuery,
  setFlowerSearchQuery,
  setStoreLoadingStage,
  setFlowersLoadingStage,
  setFlowersSortOption,
  toggleFlowersSortDecs,
  addToCart,
  removeFromCart,
  setCartItemQty,
  incrementCartItemQty,
  decrementCartItemQty,
  useCartTotalQty,
  clearCart,
  toggleFav,
  setFavs,
  type LoadingStage,
};
