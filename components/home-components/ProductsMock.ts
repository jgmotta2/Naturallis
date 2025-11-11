export function ProductsMock(number: number) {
  return Array.from({ length: number }).map((_, index) => ({
    title: "Castanha de Caju",
    price: index + 1 * 5,
    category: "Alimentos",
    id: index.toString(),
    image:
      "https://emporioxingu.com/wp-content/uploads/2022/02/castanha-caju-w1-comsal.jpg",
    hasStock: index % 2 === 0,
    desciption:
      "Descubra a essência da tradição com a Erva-Mate Especial da Vivenda do Mate, um produto que carrega a história de cinco gerações de produtores de São Mateus do Sul, Paraná. Colhida nas condições ideais do inverno e cultivada à sombra das majestosas araucárias, nossa erva-mate é o resultado de um saber-fazer transmitido de geração em geração desde 1890.",
  }));
}
