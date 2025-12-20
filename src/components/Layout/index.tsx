import { ReactNode } from "react";

import type { SettingsDocument } from "@root/prismicio-types";

import Header from "./Header";
import Footer from "./Footer";
import ClearCart from "./ClearCart";

const Layout = ({
  settings,
  children,
}: {
  settings: SettingsDocument;
  children: ReactNode;
}) => {
  return (
    <body>
      <ClearCart />
      <Header settings={settings} />
      {children}
      <Footer settings={settings} />
    </body>
  );
};

export default Layout;
