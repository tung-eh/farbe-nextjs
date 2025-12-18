import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import { twMerge } from "tailwind-merge";

import SlideIn from "@/atoms/SlideIn";

type RichTextProps = SliceComponentProps<Content.RichTextSlice>;

const RichText: FC<RichTextProps> = ({ slice }) => {
  const { title, content, ctas = [] } = slice.primary;

  return (
    <SlideIn
      className={twMerge(
        "bounded rich-text flex flex-col justify-center",
        slice.variation === "fullscreen" ? "min-h-screen" : "min-h-[40vh]",
      )}
    >
      <PrismicRichText field={title} />
      <PrismicRichText field={content} />
      {ctas.length > 0 && (
        <div className="-ml-4 mt-16 flex">
          {ctas.map((link) => (
            <PrismicNextLink
              key={link.key}
              field={link}
              className={`cta ${link.variant?.toLowerCase()}`}
            />
          ))}
        </div>
      )}
    </SlideIn>
  );
};

export default RichText;
