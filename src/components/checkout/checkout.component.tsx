import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "../__ui-kit/input/input.component";
import { CartAd } from "../cart/cart-ad.component";
import { CartTotal } from "../cart/cart-total.component";
import { Textarea } from "../__ui-kit/textarea/textarea.component";
import { Button } from "../__ui-kit/button/button.component";
import { useCartStore } from "../../zustand/cart.store";
import { Select } from "../__ui-kit/select/select.component";
import { CartItem } from "../cart/cart-item.component";
import { countries } from "../../countries";
import { CartPromo } from "../cart/cart-promo.component";

import "./checkout.styles.scss";

const shippingOptions = [
  { id: "1", name: "Free Shipping", price: "0.00" },
  { id: "2", name: "Standard Shipping", price: "10.00" },
  { id: "3", name: "Express Shipping", price: "25.30" },
];

const schema = yup
  .object({
    email: yup.string().email().required(),
    phone: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    address: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export const Checkout = () => {
  const items = useCartStore((state) => state.items);
  const shippingCost = useCartStore((state) => state.shippingCost);
  const setShippingCost = useCartStore((state) => state.setShippingCost);
  const [country, setCountry] = useState("");
  const [code, setCode] = useState("");

  const { handleSubmit, control, setValue } = useForm<FormData>({
    defaultValues: {
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      address: "",
    },
    resolver: yupResolver(schema),
  });

  function clearAddress() {
    setValue("address", "");
  }

  function selectCode(c: string) {
    setCode(c);
  }
  function selectCountry(c: string) {
    setCountry(c);
  }

  function onSubmit(data: FormData) {
    console.log(data);
  }

  useEffect(() => {
    setShippingCost("10.00");
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="checkout">
        <div className="checkout__form">
          <h6 className="checkout__title">Your Details</h6>
          <div className="checkout__row checkout__row_full">
            <Controller
              name="email"
              control={control}
              render={({ field: { ref, ...rest }, fieldState: { error } }) => (
                <Input
                  {...rest}
                  label="Your email"
                  errorMessage={error?.message}
                />
              )}
            />
          </div>
          <div className="checkout__row">
            <Controller
              name="phone"
              control={control}
              render={({ field: { ref, ...rest }, fieldState: { error } }) => (
                <Input
                  {...rest}
                  label="mobile phone"
                  type="tel"
                  errorMessage={error?.message}
                  before={{
                    element: (
                      <Select
                        options={countries}
                        optionKey="dialCode"
                        uniqueKey="name"
                        withFlag
                        value={code}
                        onChange={selectCode}
                      />
                    ),
                    size: 131,
                  }}
                />
              )}
            />
            <p className="checkout__tip">
              Your phone number is required for delivery & shipping updates.
            </p>
          </div>
          <div className="checkout__row">
            <Controller
              name="firstName"
              control={control}
              render={({ field: { ref, ...rest }, fieldState: { error } }) => (
                <Input
                  {...rest}
                  label="first name"
                  errorMessage={error?.message}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field: { ref, ...rest }, fieldState: { error } }) => (
                <Input
                  {...rest}
                  label="last name"
                  errorMessage={error?.message}
                />
              )}
            />
          </div>

          <h6 className="checkout__title checkout__title_delivery">
            Delivery Details
          </h6>
          <div className="checkout__row">
            <Select
              options={countries}
              value={country}
              onChange={selectCountry}
              optionKey="name"
              label="country"
            />
          </div>
          <Controller
            name="address"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Textarea
                {...field}
                label="delivery address"
                wrapperClassName="checkout__address"
                errorMessage={error?.message}
              />
            )}
          />
          <p className="checkout__action" onClick={clearAddress}>
            change
          </p>

          <div className="checkout__shipping">
            {shippingOptions.map((el) => (
              <div
                className="checkout__shippingItem"
                key={el.id}
                onClick={() => setShippingCost(el.price)}
              >
                <div
                  className={classNames("radio", {
                    radio_active: shippingCost === el.price,
                  })}
                >
                  <input id={el.id} type="radio" />
                  <label htmlFor={el.id}>{el.name}</label>
                </div>
                <p className="checkout__shippingCost">${el.price}</p>
              </div>
            ))}
            <p
              className="checkout__action"
              style={{ marginTop: 6 }}
              onClick={clearAddress}
            >
              about shipping
            </p>
          </div>

          <h6 className="checkout__title checkout__title_payment">
            Payment Details
          </h6>
          <div className="checkout__paymentBox">
            <div className="checkout__paymentItem"></div>
            <div className="checkout__paymentItem"></div>
          </div>
        </div>
        <div className="checkout__aside">
          <h6 className="checkout__title checkout__title_order">Your Order</h6>
          <div className="checkout__order">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            <CartPromo />
            <CartTotal withMT />
          </div>
          <Button variant="v3" type="submit" className="checkout__payNow">
            Pay now
          </Button>

          <CartAd />
        </div>
      </form>
      <footer className="footer">
        <p>Secured & Encrypted Checkout</p>
        <img src="/images/checkout-footer.png" alt="" />
      </footer>
    </>
  );
};
