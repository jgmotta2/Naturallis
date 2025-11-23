import api from "./api";

export interface Product {
  id: number;
  description: string;
  price: number;
  currency: string;
  brand: string;
  model: string;
  stock?: number;
  imageUrl?: string;
  convertedPrice?: number;
  enviroment?: string;
  name?: string;
  category?: string;
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
  async getAll(page = 0, size = 10, currency = "BRL"): Promise<Product[]> {
    try {
      const response = await api.get<PageableResponse<Product>>(
        `/products/${currency}`,
        {
          params: {
            page,
            size,
          },
        }
      );
      return response.data.content;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw error;
    }
  },

  async getById(id: number, currency = "BRL"): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}/${currency}`);
    return response.data;
  },
};
