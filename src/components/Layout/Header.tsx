import Link from "next/link";
import { PrismicNextLink } from "@prismicio/next";

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
        <ul className="flex items-center pl-8 pr-4 backdrop-blur gap-4">
          {links.map((link) => (
            <li key={link.key}>
              <PrismicNextLink field={link} />
            </li>
          ))}
          <li>
            <Link href="/#cart">Cart (0)</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
