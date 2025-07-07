import type { Metadata } from "next";

import { ChefCard } from "./components/chef-card";

import { title } from "@/components/primitives";
import { executeQuery } from "@/lib/datocms/executeQuery";
import { graphql } from "@/lib/datocms/graphql";

const ALL_RECIPES_QUERY = graphql(`
  query AllCharactersQuery {
    allCharacters {
      name
      slug
      quote
      avatar {
        width
        url
        height
      }
    }
  }
`);

export const metadata: Metadata = {
  title: "Chefs - FlavourForge",
  openGraph: {
    title: "Chefs - FlavourForge",
    description: "Meet our talented chefs who create delicious recipes.",
  },
};

export default async function ChefsPage() {
  const { allCharacters } = await executeQuery(ALL_RECIPES_QUERY);

  return (
    <div>
      <h1 className={title()}>Chefs</h1>
      <div className="mt-2 gap-2 grid grid-cols-12 grid-rows-2">
        {allCharacters.map((chef) => {
          return <ChefCard key={chef.slug} chef={chef} />;
        })}
      </div>
    </div>
  );
}
