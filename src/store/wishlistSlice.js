import { createSlice } from "@reduxjs/toolkit";

export const WISHLIST_KEY = "skymart_wishlist";

function getStoredWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch {
    return [];
  }
}

// sirf product ids rakhte hain - product ka data TanStack Query cache se aata hai
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { ids: getStoredWishlist() },
  reducers: {
    toggleWishlist(state, action) {
      const id = action.payload;
      const index = state.ids.indexOf(id);
      if (index >= 0) state.ids.splice(index, 1);
      else state.ids.push(id);
    },
    removeFromWishlist(state, action) {
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
    clearWishlist(state) {
      state.ids = [];
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export const selectWishlistIds = (state) => state.wishlist.ids;
export const selectIsWishlisted = (id) => (state) => state.wishlist.ids.includes(id);

export default wishlistSlice.reducer;
