import { ReactNode } from "react";

import type { SettingsDocument } from "@root/prismicio-types";

const Layout = ({
  settings,
  children,
}: {
  settings: SettingsDocument;
  children: ReactNode;
}) => {
  return (
    <body>
      <div>{JSON.stringify(settings)}</div>
      {children}
    </body>
  );
};

export default Layout;
