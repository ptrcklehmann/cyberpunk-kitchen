"use client";
import { Card, Image, CardFooter } from "@heroui/react";
import Link from "next/link";
import NextImage from "next/image";

type ChefCardProps = {
  chef: {
    name: string;
    slug: string;
    quote: string | null;
    avatar: {
      width: number | null;
      url: string;
      height: number | null;
    } | null;
  };
};
export const ChefCard = ({
  chef: { name, slug, avatar, quote },
}: ChefCardProps) => {
  const chefImage = avatar?.url || "/images/placeholder.png";

  return (
    <Card
      isFooterBlurred
      isPressable
      as={Link}
      className="col-span-12 sm:col-span-4 h-[300px] cursor-pointer z-10 transition transform ease-in-out hover:-translate-y-0.5 hover:shadow-lg relative"
      href={`/chefs/${slug}`}
      title={name}
    >
      <Image
        removeWrapper
        alt={`Chef ${name}`}
        as={NextImage}
        className="z-0 w-full h-full object-cover"
        height={avatar?.height || 400}
        src={chefImage}
        width={avatar?.width || 400}
      />
      <CardFooter className="absolute bg-default-100/40 bottom-0 border-t-1 border-zinc-100/50 z-10 flex-col items-start p-4">
        <h4 className="font-bold text-xl text-default-foreground">{name}</h4>
        <small className="text-default-900">{quote}</small>
      </CardFooter>
    </Card>
  );
};
