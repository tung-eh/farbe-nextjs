import { FC } from "react";
import { isFilled, type Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { twMerge } from "tailwind-merge";

import getSceneAttributes from "@/lib/getSceneAttributes";
import SlideIn from "@/atoms/SlideIn";

export type PictureProps = SliceComponentProps<Content.PictureSlice>;

const Picture: FC<PictureProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      {...getSceneAttributes({
        position: "top",
        model: isFilled.contentRelationship(slice.primary.product)
          ? slice.primary.product.uid
          : undefined,
      })}
      className="grid xl:grid-cols-[3fr_2fr]"
    >
      <figure className="contents">
        <PrismicNextImage
          field={slice.primary.picture}
          alt=""
          className="row-span-2 z-20"
        />
        <SlideIn
          as="figcaption"
          className={twMerge(
            "px-4 pt-4 pb-16 rich-text",
            slice.variation === "top"
              ? "xl:order-last xl:self-end"
              : "xl:self-start",
          )}
        >
          <PrismicRichText field={slice.primary.caption} />
        </SlideIn>
      </figure>
      {isFilled.image(slice.primary.secondary_picture) && (
        <figure
          className={twMerge(
            "flex flex-col",
            slice.variation === "bottom" && "xl:self-end xl:flex-col-reverse",
          )}
        >
          <PrismicNextImage
            field={slice.primary.secondary_picture}
            alt=""
            className="z-20"
          />
          <SlideIn as="figcaption" className="px-4 pt-4 pb-16 rich-text">
            <PrismicRichText field={slice.primary.secondary_caption} />
          </SlideIn>
        </figure>
      )}
    </section>
  );
};

export default Picture;
