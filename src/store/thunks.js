// CLASSIC REDUX THUNK - action creator jo object ki jagah function return karta hai.
// redux-thunk middleware us function ko (dispatch, getState) deta hai.
//
// checkout = placeOrder (API call) + success par koi bhi callback (jaise cart clear)
import { placeOrder } from "./ordersSlice";

export const checkout =
  (orderData, { onSuccess } = {}) =>
  async (dispatch, getState) => {
    // double click se do orders na ban jaye
    if (getState().orders.status === "loading") return null;

    // unwrap() -> fulfilled par payload deta hai, rejected par error throw karta hai
    const order = await dispatch(placeOrder(orderData)).unwrap();

    if (onSuccess) onSuccess(order);
    return order;
  };
