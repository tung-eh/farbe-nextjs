import { FC } from "react";
import { isFilled, Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicTable,
  SliceComponentProps,
} from "@prismicio/react";

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

  return product?.data ? (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bounded rich-text min-h-[150vh] flex flex-col justify-center"
    >
      <PrismicRichText field={product.data.name} />
      <PrismicRichText field={product.data.description} />
      <PrismicTable field={product.data.characteristics} />
    </section>
  ) : (
    <section>
      <p>Product not found</p>
    </section>
  );
};

export default Product;
