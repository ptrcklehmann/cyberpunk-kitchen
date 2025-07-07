import type { Metadata } from "next";

import { RecipeCard } from "./components/recipe-card";

import { title } from "@/components/primitives";
import { executeQuery } from "@/lib/datocms/executeQuery";
import { graphql } from "@/lib/datocms/graphql";

const ALL_RECIPES_QUERY = graphql(`
  query AllRecipesQuery {
    allRecipes {
      id
      title
      slug
      image {
        url
      }
      chef {
        slug
        name
        avatar {
          url
        }
      }
    }
  }
`);

export const metadata: Metadata = {
  title: "Recipes - FlavourForge",
  openGraph: {
    title: "Recipes - FlavourForge",
    description: "Explore our collection of delicious recipes.",
  },
};

export default async function RecipesPage() {
  const { allRecipes } = await executeQuery(ALL_RECIPES_QUERY);

  return (
    <>
      <h1 className={title()}>Recipes</h1>
      <div className="grid grid-cols-2 gap-4">
        {allRecipes.map((recipe) => {
          return (
            <RecipeCard
              key={recipe.id}
              chef={recipe.chef}
              imageUrl={recipe.image.url}
              slug={recipe.slug}
              title={recipe.title}
            />
          );
        })}
      </div>
    </>
  );
}
