import { useQuery } from "@tanstack/react-query";
import api from "@/services/axios";
import type { Restaurant } from "@/types/restaurant";

export const useRestaurantDetail = (id: number | string) =>
  useQuery<Restaurant>({
    queryKey: ["restaurant", id],
    queryFn: async () => {
      const res = await api.get(`/api/resto/${id}`);
      return res.data.data; // pastikan API mengembalikan data restoran lengkap beserta menus
    },
    enabled: !!id,
  });


