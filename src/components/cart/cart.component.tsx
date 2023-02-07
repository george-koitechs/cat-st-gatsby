import React from "react";
import classNames from "classnames";
import { navigate } from "gatsby";
import { useLocation } from "@reach/router";
import { shallow } from "zustand/shallow";

import { CartAd } from "./cart-ad.component";
import { CartTotal } from "./cart-total.component";
import { Button } from "../__ui-kit/button/button.component";
import { useCartStore } from "../../zustand/cart.store";
import { CartItem } from "./cart-item.component";
import { CartPromo } from "./cart-promo.component";

import "./cart.styles.scss";

export const Cart = () => {
  const location = useLocation();
  const isCheckoutPage = location.pathname === "/checkout";
  const [isOpened, close, items] = useCartStore(
    (state) => [state.isOpened, state.close, state.items],
    shallow
  );

  console.log("location", location);

  function goToCheckout() {
    navigate("/checkout");
    close();
  }

  return (
    <div className={classNames("cart", { cart_active: isOpened })}>
      <div
        className={classNames("cart__overlay", {
          cart__overlay_active: isOpened,
        })}
        onClick={close}
      ></div>
      <div
        className={classNames("cart__sidebar", {
          cart__sidebar_active: isOpened,
        })}
      >
        <div className="cart__head">
          <button className="cart__close" onClick={close}>
            <span></span>
            <span></span>
          </button>
          <h6 className="cart__title">Your Cart</h6>
        </div>
        {!!items.length ? (
          <>
            <div className="cart__content">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
              <CartPromo />
              {isCheckoutPage && <CartAd className="cart__ad" />}
            </div>
            <CartTotal className="cart__total" />
            <Button
              variant="v2"
              className="cart__checkoutNow"
              onClick={goToCheckout}
            >
              Checkout now
            </Button>
          </>
        ) : (
          <p className="cart__empty">
            There’s nothing for your poor cat in your cart!
          </p>
        )}
      </div>
    </div>
  );
};
