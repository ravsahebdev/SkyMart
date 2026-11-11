import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer, { WISHLIST_KEY } from "./wishlistSlice";
import ordersReducer, { ORDERS_KEY } from "./ordersSlice";

// configureStore me redux-thunk middleware default se laga hota hai
export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    orders: ordersReducer,
  },
});

// wishlist aur orders badalte hi localStorage me save (refresh ke baad bhi rahe)
let prevIds = store.getState().wishlist.ids;
let prevOrders = store.getState().orders.list;

store.subscribe(() => {
  const state = store.getState();

  try {
    if (state.wishlist.ids !== prevIds) {
      prevIds = state.wishlist.ids;
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(prevIds));
    }
    if (state.orders.list !== prevOrders) {
      prevOrders = state.orders.list;
      localStorage.setItem(ORDERS_KEY, JSON.stringify(prevOrders));
    }
  } catch {
    // storage full / blocked - app chalti rahe
  }
});
