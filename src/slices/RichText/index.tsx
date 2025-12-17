import { type FC } from "react";
import { type Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";

type RichTextProps = SliceComponentProps<Content.RichTextSlice>;

const RichText: FC<RichTextProps> = ({ slice }) => {
  const { title, content, ctas = [] } = slice.primary;

  return (
    <section className="bounded rich-text">
      <PrismicRichText field={title} />
      <PrismicRichText field={content} />
      {ctas.length > 0 && (
        <div className="-ml-4 mt-16 flex gap-8">
          {ctas.map((link) => (
            <PrismicNextLink
              key={link.key}
              field={link}
              className={`cta ${link.variant?.toLowerCase()}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default RichText;
