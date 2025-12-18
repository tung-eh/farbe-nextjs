import { FC } from "react";
import { isFilled, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type ProductProps = SliceComponentProps<Content.ProductSlice>;

const getProduct = (slice: ProductProps["slice"]) => {
  const { product } = slice.primary;

  if (!isFilled.contentRelationship(product)) {
    return undefined;
  }

  return product;
};

const Product: FC<ProductProps> = ({ slice }) => {
  const product = getProduct(slice);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={product?.data?.name} />
    </section>
  );
};

export default Product;
