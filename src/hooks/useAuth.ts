import { useMutation } from "@tanstack/react-query";
import api from "../services/axios";
import type { AxiosResponse } from "axios";
import type {
  LoginPayload,
  RegisterPayload,
  AuthResponse,
} from "../types/auth";
import { setToken } from "../lib/auth";

export const useLogin = () =>
  useMutation<AuthResponse, any, LoginPayload>({
    mutationFn: async (payload: LoginPayload) => {
      const res = await api.post<AuthResponse>("/api/auth/login", payload);
      return res.data;
    },
    onSuccess: (data) => {
      setToken(data.data.token);
    },
  });

export const useRegister = () =>
  useMutation<AuthResponse, any, RegisterPayload>({
    mutationFn: async (payload: RegisterPayload) => {
      const res: AxiosResponse<AuthResponse> = await api.post(
        "/api/auth/register",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      return res.data;
    },
    onSuccess: (data) => {
      setToken(data.data.token);
    },
  });
