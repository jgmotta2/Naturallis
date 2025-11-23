import React, { createContext, ReactNode, useContext, useState } from "react";

type CurrencyContextData = {
  currency: string;
  toggleCurrency: () => void;
};

const CurrencyContext = createContext<CurrencyContextData>(
  {} as CurrencyContextData
);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState("BRL");

  function toggleCurrency() {
    setCurrency((prev) => (prev === "BRL" ? "USD" : "BRL"));
  }

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
