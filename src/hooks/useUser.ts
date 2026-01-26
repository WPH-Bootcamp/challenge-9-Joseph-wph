import { useQuery } from "@tanstack/react-query";
import api from "../services/axios";

export const useUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/api/auth/profile");
      return res.data;
    },
  });
};