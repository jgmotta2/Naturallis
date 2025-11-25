import React, { createContext, ReactNode, useContext, useState } from "react";

export type FilterState = {
  search: string;
  categoryId: string | null;
  brand: string | null;
  priceRange: string | null;
  onlyFreeShipping: boolean;
  onlyInterestFree: boolean;
};

export type FilterSource = "home" | "favorites";

type FilterContextData = {
  homeFilters: FilterState;
  favoritesFilters: FilterState;

  updateFilter: (
    source: FilterSource,
    key: keyof FilterState,
    value: any
  ) => void;

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
