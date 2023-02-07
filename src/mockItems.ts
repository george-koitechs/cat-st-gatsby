// @ts-ignore
import cream from "./assets/images/cat-street-creme_2000.webp";
// @ts-ignore
import olive from "./assets/images/cat-street-olive_2000.webp";

import { ICartItem } from "./zustand/cart.types";

export const creamItem: ICartItem = {
  id: 1,
  image: cream,
  name: "Bouclé Bungalow “Creme” Cover",
  quantity: 1,
  price: "239.00",
};
export const oliveItem: ICartItem = {
  id: 2,
  image: olive,
  name: "Replacement Cover in “Catnip”",
  quantity: 1,
  price: "139.00",
};
