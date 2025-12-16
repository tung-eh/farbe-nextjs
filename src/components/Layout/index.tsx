import { ReactNode } from "react";

import type { SettingsDocument } from "@root/prismicio-types";

import Header from "./Header";

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
    </body>
  );
};

export default Layout;
