export type CartItem = {
  id: string;
  title: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
};

const CAJU_IMAGE = "https://emporioxingu.com/wp-content/uploads/2022/02/castanha-caju-w1-comsal.jpg";

export const cartItemsMock: CartItem[] = [
  {
    id: "1",
    title: "Erva-mate",
    category: "Alimentos",
    price: 20.90,
    quantity: 1,
    image: CAJU_IMAGE,
  },
  {
    id: "2",
    title: "Chá Verde",
    category: "Alimentos",
    price: 1.90,
    quantity: 1,
    image: CAJU_IMAGE,
  },
  {
    id: "3",
    title: "Castanha de Caju",
    category: "Alimentos",
    price: 28.90,
    quantity: 1,
    image: CAJU_IMAGE,
  },
];