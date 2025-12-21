import { ReactNode } from "react";

import type { SettingsDocument } from "@root/prismicio-types";

import Header from "./Header";
import Footer from "./Footer";
import ClearCart from "./ClearCart";
import Canvas from "./Canvas";

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
      <Canvas className="fixed inset-0 h-screen z-1" />
    </body>
  );
};

export default Layout;
