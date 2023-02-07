import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

import { HomePage } from "../components/__pages/home/home.page";
import { Layout } from "../components/layout/layout.component";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <HomePage />
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
