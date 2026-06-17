import Image, { type ImageProps } from "next/image";

export const PriorityImg = ({ alt, ...props }: ImageProps) => {
  return <Image priority alt={alt} {...props} />;
};
