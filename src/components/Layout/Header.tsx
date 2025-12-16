import Link from "next/link";

import type { SettingsDocument } from "@root/prismicio-types";

import BrandSignature from "./BrandSignature";

const Header = ({ settings }: { settings: SettingsDocument }) => {
  const links = settings.data.navigation;

  return (
    <header>
      <nav className="flex justify-between">
        <Link href="/">
          <BrandSignature className="h-[1em] w-auto" />
        </Link>
        <ul className="max-w-[50vw]">{JSON.stringify(links)}</ul>
      </nav>
    </header>
  );
};

export default Header;
