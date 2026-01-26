import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import api from "../services/axios";
import type { Restaurant } from "@/types/restaurant";

type Category = "All Restaurant" | "Nearby" | "Best Seller" | string;

export const useRestaurants = (category?: Category) => {
  // ✅ Type untuk options
  const options: UseQueryOptions<Restaurant[], Error> = {
    queryKey: ["restaurants", category],
    queryFn: async () => {
      let endpoint = "/api/resto";

      if (category === "Nearby") endpoint = "/api/resto/nearby";
      else if (category === "Best Seller") endpoint = "/api/resto/best-seller";

      const res = await api.get(endpoint);
      const restaurants =
        res.data.data?.restaurants || res.data?.restaurants || [];

      return restaurants.map(
        (item: any): Restaurant => ({
          id: item.id,
          name: item.name,
          category: item.category,
          rating: item.star,
          address: item.place,
          imageUrl: item.logo || item.images?.[0] || "",
        }),
      );
    },
    placeholderData: (previousData) => previousData,
  };

  return useQuery<Restaurant[], Error>(options);
};
