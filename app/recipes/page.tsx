import { RecipeCard } from "./components/recipeCard";

import { title } from "@/components/primitives";
import { executeQuery } from "@/lib/datocms/executeQuery";
import { graphql } from "@/lib/datocms/graphql";

const ALL_RECIPES_QUERY = graphql(`
  query AllRecipesQuery {
    allRecipes {
      id
      _createdAt
      title
      image {
        url
        width
        height
      }
      cookingTime
      servings
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
              image={{
                url: recipe.image.url,
                width: recipe.image.width || 300,
                height: recipe.image.height || 300,
              }}
              title={recipe.title}
            />
          );
        })}
      </h1>
    </div>
  );
}
