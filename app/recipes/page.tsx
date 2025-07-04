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
      endorsedBy {
        slug
        name
        avatar {
          url
        }
      }
    }
  }
`);

export default async function RecipesPage() {
  const { allRecipes } = await executeQuery(ALL_RECIPES_QUERY);

  return (
    <div>
      <h1 className={title()}>
        {allRecipes.map((recipe) => {
          return (
            <RecipeCard
              key={recipe.id}
              endorsedBy={recipe.endorsedBy[0]}
              imageUrl={recipe.image.url}
              slug={recipe.slug}
              title={recipe.title}
            />
          );
        })}
      </h1>
    </div>
  );
}
