import {
  useQuery,
  useQueries,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  fetchProducts,
  fetchProductById,
  fetchCategories,
} from "../api/fakeStoreApi";
import { fetchProductsByCategory } from "../api/storeApi";

// query keys ek jagah - cache invalidate/prefetch me yahi keys kaam aate hain
export const productKeys = {
  list: (category = "all") => ["products", "list", category],
  detail: (id) => ["products", "detail", String(id)],
  categories: ["products", "categories"],
};

// category = "all" ho to saare products, warna sirf us category ke
export function useProductsQuery(category = "all") {
  return useQuery({
    queryKey: productKeys.list(category),
    queryFn: () =>
      category === "all" ? fetchProducts() : fetchProductsByCategory(category),
    placeholderData: keepPreviousData, // category badalte waqt purana data dikhta rahe
  });
}

export function useProductQuery(id) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProductById(id),
    enabled: Boolean(id),
  });
}

export function useCategoriesQuery() {
  return useQuery({
    queryKey: productKeys.categories,
    queryFn: fetchCategories,
    staleTime: Infinity, // categories lagbhag kabhi nahi badalti
  });
}

// ek saath kai products (wishlist ke liye) - har id ka apna cache entry
export function useProductsByIds(ids) {
  return useQueries({
    queries: ids.map((id) => ({
      queryKey: productKeys.detail(id),
      queryFn: () => fetchProductById(id),
    })),
  });
}

// hover par product pehle se load kar lo, taaki quick view instantly khule
export function usePrefetchProduct() {
  const queryClient = useQueryClient();
  return (id) =>
    queryClient.prefetchQuery({
      queryKey: productKeys.detail(id),
      queryFn: () => fetchProductById(id),
    });
}
