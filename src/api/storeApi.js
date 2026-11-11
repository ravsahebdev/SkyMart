// Extra REST calls (Fake Store API) - purani fakeStoreApi.js ko bilkul touch nahi kiya
// docs: https://fakestoreapi.com/docs

const BASE_URL = "https://fakestoreapi.com";

// GET /products/category/:name  -> sirf us category ke products
export async function fetchProductsByCategory(category) {
  const res = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error("Failed to load category products");
  return res.json();
}

// POST /carts  -> order/cart create karta hai, response me naya id aata hai
// body: { userId, date, products: [{ productId, quantity }] }
export async function createCart({ userId, products }) {
  const res = await fetch(`${BASE_URL}/carts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      date: new Date().toISOString().slice(0, 10),
      products,
    }),
  });
  if (!res.ok) throw new Error("Order could not be placed. Please try again.");
  return res.json();
}
