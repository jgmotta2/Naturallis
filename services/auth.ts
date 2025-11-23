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

interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

const AUTH_KEY = "user_token";

export const authService = {
  async login(credentials: SigninDTO): Promise<void> {
    const response = await api.post<AuthResponse>("/auth/signin", credentials);

    const { token } = response.data;

    if (token) {
      await SecureStore.setItemAsync(AUTH_KEY, token);
    } else {
      throw new Error("Token não encontrado na resposta");
    }
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
