import api from "./api";

export interface OrderItemDTO {
  productId: number;
  quantity: number;
}

export interface OrderDTO {
  items: OrderItemDTO[];
}

export const orderService = {
  async createOrder(orderData: OrderDTO) {
    const response = await api.post("/ws/orders", orderData);
    return response.data;
  },
};
