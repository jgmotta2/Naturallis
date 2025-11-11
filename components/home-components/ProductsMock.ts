export function ProductsMock(number: number) {
  return Array.from({ length: number }).map((_, index) => ({
    title: "Castanha de Caju",
    price: index * 5,
    category: "Alimentos",
    id: index.toString(),
    image:
      "https://emporioxingu.com/wp-content/uploads/2022/02/castanha-caju-w1-comsal.jpg",
  }));
}
