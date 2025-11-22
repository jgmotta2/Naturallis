import * as SecureStore from "expo-secure-store";
import api from "./api";

export interface SigninDTO {
  email: string;
  password?: string;
}

export interface SignupDTO {
  name: string;
  email: string;
  password?: string;
}

const AUTH_KEY = "user_token";

export const authService = {
  async login(credentials: SigninDTO): Promise<void> {
    const response = await api.post<string>("/auth/signin", credentials);
    const token = response.data;

    await SecureStore.setItemAsync(AUTH_KEY, token);
  },

  async register(data: SignupDTO): Promise<void> {
    await api.post("/auth/signup", data);
  },

  async logout(): Promise<void> {
    await SecureStore.deleteItemAsync(AUTH_KEY);
  },

  async getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(AUTH_KEY);
  },
};
