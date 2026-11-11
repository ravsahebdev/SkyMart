import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createCart } from "../api/storeApi";

export const ORDERS_KEY = "skymart_orders";

function getStoredOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch {
    return [];
  }
}

// ASYNC THUNK: POST /carts REST call. pending / fulfilled / rejected actions
// RTK khud dispatch karta hai (ye redux-thunk middleware ke upar hi bana hai)
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async ({ userId, items, total, customer }, { rejectWithValue }) => {
    try {
      const apiResponse = await createCart({
        userId,
        products: items.map((item) => ({ productId: item.id, quantity: item.qty })),
      });

      return {
        orderId: `SM-${Date.now().toString(36).toUpperCase()}`,
        apiRef: apiResponse.id,
        items,
        total,
        customer,
        status: "Confirmed",
        placedAt: new Date().toISOString(),
      };
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    list: getStoredOrders(),
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    resetOrderStatus(state) {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list.unshift(action.payload); // naya order sabse upar
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetOrderStatus } = ordersSlice.actions;

export const selectOrders = (state) => state.orders.list;
export const selectOrderStatus = (state) => state.orders.status;
export const selectOrderError = (state) => state.orders.error;

export default ordersSlice.reducer;
