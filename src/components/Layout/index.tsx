import { ReactNode } from "react";

import type { SettingsDocument } from "@root/prismicio-types";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({
  settings,
  children,
}: {
  settings: SettingsDocument;
  children: ReactNode;
}) => {
  return (
    <body>
      <Header settings={settings} />
      {children}
      <Footer settings={settings} />
    </body>
  );
};

export default Layout;
