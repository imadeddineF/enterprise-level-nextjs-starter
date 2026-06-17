import Image, { type ImageProps } from "next/image";

export const LazyImg = ({ alt, ...props }: ImageProps) => {
  return <Image loading="lazy" alt={alt} {...props} />;
};
