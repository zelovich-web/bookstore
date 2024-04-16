import React, { createContext, useContext, useState } from 'react';

interface BasketContextProps {
  bookInBasket: boolean;
  setBookInBasket: React.Dispatch<React.SetStateAction<boolean>>;
}

const BasketContext = createContext<BasketContextProps>({
  bookInBasket: false,
  setBookInBasket: () => {},
});

export function useBasketContext() {
  return useContext(BasketContext);
}

export function BasketProvider({ children }) {
  const [bookInBasket, setBookInBasket] = useState(false);

  return (
    <BasketContext.Provider value={{ bookInBasket, setBookInBasket }}>
      {children}
    </BasketContext.Provider>
  );
}