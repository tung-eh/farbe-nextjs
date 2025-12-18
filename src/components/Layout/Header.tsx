import Link from "next/link";
import { PrismicNextLink } from "@prismicio/next";

import type { SettingsDocument } from "@root/prismicio-types";

import BrandSignature from "./BrandSignature";

const Header = ({ settings }: { settings: SettingsDocument }) => {
  const links = settings.data.navigation;

  return (
    <header className="fixed top-0 left-0 right-0 z-10">
      <nav className="flex justify-between backdrop-blur xl:backdrop-none">
        <Link href="/" className="cta ml-4">
          <BrandSignature className="text-lg" />
        </Link>
        <ul className="xl:w-[calc(40%+2rem)] flex items-center pl-8 pr-4 xl:backdrop-blur">
          {links.map((link) => (
            <li key={link.key} className="hidden xl:block">
              <PrismicNextLink field={link} className="cta" />
            </li>
          ))}
          <li className="ml-auto">
            <Link href="/#cart" className="cta">
              Cart (0)
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
