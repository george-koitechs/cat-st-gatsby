import React, { PropsWithChildren } from "react";

import { Cart } from "../cart/cart.component";

import "./layout.styles.scss";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Cart />
      {children}
    </>
  );
};
