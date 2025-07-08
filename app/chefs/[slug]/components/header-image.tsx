"use client";
import { Image } from "@heroui/react";
import NextImage from "next/image";

type HeaderImageProps = {
  imageUrl: string;
  title: string;
};
export const HeaderImage = ({ imageUrl, title }: HeaderImageProps) => {
  return (
    <Image
      alt={title}
      as={NextImage}
      className="rounded-3xl w-full h-32 md:w-58 md:h-58 object-cover"
      height={400}
      src={imageUrl}
      width={500}
    />
  );
};
