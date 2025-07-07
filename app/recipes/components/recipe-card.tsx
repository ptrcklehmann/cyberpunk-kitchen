"use client";
import {
  Card,
  CardFooter,
  Image,
  CardHeader,
  Avatar,
  Tooltip,
} from "@heroui/react";
import Link from "next/link";

type RecipeCardProps = {
  title: string;
  slug: string;
  imageUrl: string;
  chef: {
    slug: string | null;
    name: string;
    avatar: {
      url: string;
    } | null;
  };
};
export const RecipeCard = ({
  title,
  slug,
  imageUrl,
  chef,
}: RecipeCardProps) => {
  const authorImage = chef.avatar?.url;

  return (
    <Card
      isFooterBlurred
      isPressable
      as={Link}
      className="h-[300px] col-span-12 sm:col-span-5"
      href={`/recipes/${slug}`}
      title={title}
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-white/80 uppercase font-bold">New</p>
        <h4 className="text-white font-medium text-2xl">{title}</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card example background"
        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
        src={imageUrl}
      />
      <CardFooter className="absolute bg-white/20 bottom-0 border-t-1 border-zinc-500/50 z-10 justify-end">
        <Tooltip content={`by ${chef.name}`} placement="top">
          <Avatar
            isBordered
            showFallback
            alt="Author avatar"
            color="primary"
            name={chef.name}
            size="sm"
            src={authorImage || ""}
          />
        </Tooltip>
      </CardFooter>
    </Card>
  );
};
