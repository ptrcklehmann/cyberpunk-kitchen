"use client";
import { Card, CardFooter, Image, Button, CardHeader } from "@heroui/react";

type RecipeCardProps = {
  title: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
};
export const RecipeCard = ({
  title,
  image: { url, width, height },
}: RecipeCardProps) => {
  return (
    <Card
      isFooterBlurred
      className="w-full h-[300px] col-span-12 sm:col-span-5"
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-white/80 uppercase font-bold">New</p>
        <h4 className="text-white font-medium text-2xl">{title}</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card example background"
        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
        src={url}
      />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <Button
          className="text-sm text-stone-900"
          color="secondary"
          radius="full"
          size="sm"
        >
          Check it out
        </Button>
      </CardFooter>
    </Card>
  );
};
