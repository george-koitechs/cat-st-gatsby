import React from "react";
import { Link } from "gatsby";
import { Checkout } from "../../checkout/checkout.component";
// @ts-ignore
import logo from "../../../assets/images/catstreet-logo.svg";
import "./checkout.page.styles.scss";

export const CheckoutPage = () => {
  return (
    <div className="checkoutPage">
      <div className="container">
        <Link to="/" className="checkoutPage__link">
          <img src={logo} alt="Cat st." />
        </Link>
        <h1 className="checkoutPage__title">Checkout</h1>
        <Checkout />
      </div>
    </div>
  );
};
