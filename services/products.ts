import api from "./api";

export interface Product {
  id: string;
  name: string;
  price: number;
  category?: string;
  description?: string;
  image?: string;
}

interface PageableResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export const productService = {
  async getAll(page = 0, size = 10, name = ""): Promise<Product[]> {
    try {
      const response = await api.get<PageableResponse<Product>>("/products", {
        params: { page, size, name },
      });
      return response.data.content;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw error;
    }
  },

  async getById(id: string): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },
};
