import { FC } from "react";
import { isFilled, type Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export type PictureProps = SliceComponentProps<Content.PictureSlice>;

const Picture: FC<PictureProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="grid xl:grid-cols-[3fr_2fr]"
    >
      <figure>
        <PrismicNextImage field={slice.primary.picture} />
        <figcaption>
          <PrismicRichText field={slice.primary.caption} />
        </figcaption>
      </figure>
      {isFilled.image(slice.primary.secondary_picture) && (
        <figure>
          <PrismicNextImage field={slice.primary.secondary_picture} />
          <figcaption>
            <PrismicRichText field={slice.primary.secondary_caption} />
          </figcaption>
        </figure>
      )}
    </section>
  );
};

export default Picture;
