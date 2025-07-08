"use client";
import { Card, Image, CardBody } from "@heroui/react";
import Link from "next/link";
import NextImage from "next/image";

type ChefRecipeCardProps = {
  recipe: {
    title: string;
    slug: string;
    image: {
      url: string;
      width: number | null;
      height: number | null;
    };
  };
};

export const ChefRecipeCard = ({
  recipe: { title, slug, image },
}: ChefRecipeCardProps) => {
  return (
    <Card
      isPressable
      as={Link}
      className="flex flex-row gap-4 cursor-pointer z-10 transition transform ease-in-out hover:-translate-y-0.5 hover:shadow-lg relative"
      href={`/recipes/${slug}`}
      title={title}
    >
      <Image
        alt={`Chef ${title}`}
        as={NextImage}
        className="w-full h-22 row-span-1"
        height={120}
        src={image.url}
        width={120}
      />
      <CardBody className="col-span-4 col-start-3">
        <h4 className="font-bold text-xl text-default-foreground">{title}</h4>
      </CardBody>
    </Card>
  );
};
