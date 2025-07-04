"use client";
import { Image } from "@heroui/react";
import NextImage from "next/image";

export const HeaderImage = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <Image
      isBlurred
      alt="Recipe header image"
      as={NextImage}
      className="mb-4 w-full object-cover"
      height={300}
      src={imageUrl}
      width={500}
    />
  );
};
