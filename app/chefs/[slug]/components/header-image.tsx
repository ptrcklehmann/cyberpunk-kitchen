"use client";
import { Image } from "@heroui/react";
import NextImage from "next/image";

type HeaderImageProps = {
  imageUrl: string;
  title: string;
  focalPoint: {
    x: number;
    y: number;
  } | null;
};
export const HeaderImage = ({
  imageUrl,
  title,
  focalPoint,
}: HeaderImageProps) => {
  // Convert focal point from 0-1 coordinates to percentage
  const objectPosition = focalPoint
    ? `${focalPoint.x * 100}% ${focalPoint.y * 100}%`
    : "center center";

  return (
    <Image
      alt={title}
      as={NextImage}
      className="rounded-3xl w-full h-32 md:w-58 md:h-58 object-cover"
      height={400}
      src={imageUrl}
      style={{ objectPosition }}
      width={500}
    />
  );
};
