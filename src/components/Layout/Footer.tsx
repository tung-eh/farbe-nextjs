import type { SettingsDocument } from "@root/prismicio-types";

import BrandLogo from "./BrandLogo";
import BrandSignature from "./BrandSignature";

const Footer = ({ settings }: { settings: SettingsDocument }) => {
  return (
    <footer className="relative z-20 bg-black text-white">
      <figure className="absolute inset-0">
        <BrandLogo className="h-screen w-full xl:w-auto" />
      </figure>
      <section className="min-h-screen flex flex-col">
        <h2>
          <BrandSignature />
        </h2>
      </section>
    </footer>
  );
};

export default Footer;
