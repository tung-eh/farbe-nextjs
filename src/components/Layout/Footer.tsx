import type { SettingsDocument } from "@root/prismicio-types";

import Logo from "./Logo";

const Footer = ({ settings }: { settings: SettingsDocument }) => {
  return (
    <footer className="relative z-20 bg-black text-white">
      <figure className="absolute inset-0">
        <Logo className="h-screen w-full xl:w-auto" />
      </figure>
      <section className="min-h-screen"></section>
    </footer>
  );
};

export default Footer;
