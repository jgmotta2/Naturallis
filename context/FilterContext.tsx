import React, { createContext, ReactNode, useContext, useState } from "react";

// Tipo dos Filtros
export type FilterState = {
  search: string;
  categoryId: string | null;
  brand: string | null;
  priceRange: string | null;
  onlyFreeShipping: boolean;
  onlyInterestFree: boolean;
};

// Tipo da 'Fonte' (quem está chamando)
export type FilterSource = "home" | "favorites";

type FilterContextData = {
  // Estados separados
  homeFilters: FilterState;
  favoritesFilters: FilterState;

  // Função genérica para atualizar
  updateFilter: (
    source: FilterSource,
    key: keyof FilterState,
    value: any
  ) => void;

  // Função para limpar
  resetFilters: (source: FilterSource) => void;
};

const FilterContext = createContext<FilterContextData>({} as FilterContextData);

const INITIAL_STATE: FilterState = {
  search: "",
  categoryId: null,
  brand: null,
  priceRange: null,
  onlyFreeShipping: false,
  onlyInterestFree: false,
};

export function FilterProvider({ children }: { children: ReactNode }) {
  // Dois estados independentes
  const [homeFilters, setHomeFilters] = useState<FilterState>({
    ...INITIAL_STATE,
  });
  const [favoritesFilters, setFavoritesFilters] = useState<FilterState>({
    ...INITIAL_STATE,
  });

  function updateFilter(
    source: FilterSource,
    key: keyof FilterState,
    value: any
  ) {
    if (source === "home") {
      setHomeFilters((prev) => ({ ...prev, [key]: value }));
    } else {
      setFavoritesFilters((prev) => ({ ...prev, [key]: value }));
    }
  }

  function resetFilters(source: FilterSource) {
    if (source === "home") {
      // Mantemos a busca na home se quiser, ou limpa tudo. Vamos limpar tudo para simplificar.
      setHomeFilters({ ...INITIAL_STATE });
    } else {
      setFavoritesFilters({ ...INITIAL_STATE });
    }
  }

  return (
    <FilterContext.Provider
      value={{
        homeFilters,
        favoritesFilters,
        updateFilter,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  return useContext(FilterContext);
}
