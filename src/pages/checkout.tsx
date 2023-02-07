import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

import { CheckoutPage } from "../components/__pages/checkout/checkout.page";
import { Layout } from "../components/layout/layout.component";

const PageCheckout: React.FC<PageProps> = () => {
  return (
    <Layout>
      <CheckoutPage />
    </Layout>
  );
};

export default PageCheckout;

export const Head: HeadFC = () => <title>Checkout Page</title>;
