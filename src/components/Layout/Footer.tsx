import { PrismicRichText } from "@prismicio/react";

import type { SettingsDocument } from "@root/prismicio-types";
import getSceneAttributes from "@/lib/getSceneAttributes";
import SlideIn from "@/atoms/SlideIn";

import BrandLogo from "./BrandLogo";
import BrandSignature from "./BrandSignature";

const Footer = ({ settings }: { settings: SettingsDocument }) => {
  return (
    <footer
      {...getSceneAttributes({ position: "top" })}
      className="relative z-20 bg-black text-white"
    >
      <figure className="absolute inset-0">
        <BrandLogo className="h-screen w-full xl:w-auto" />
      </figure>
      <SlideIn className="bounded rich-text min-h-screen flex flex-col mix-blend-difference">
        <h2>
          <BrandSignature />
        </h2>
        <PrismicRichText field={settings.data.footer_content} />
        <div className="flex-1" />
        <PrismicRichText field={settings.data.footer_secondary_content} />
      </SlideIn>
    </footer>
  );
};

export default Footer;
