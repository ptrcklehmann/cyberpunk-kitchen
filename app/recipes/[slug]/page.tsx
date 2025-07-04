import Markdown from "react-markdown";

import { HeaderImage } from "./header-image";

import { title } from "@/components/primitives";
import { executeQuery } from "@/lib/datocms/executeQuery";
import { graphql } from "@/lib/datocms/graphql";

const RECIPE_BY_SLUG_QUERY = graphql(`
  query RecipeBySlugQuery($slug: String!) {
    recipe(filter: { slug: { eq: $slug } }) {
      slug
      image {
        url
        width
        height
      }
      ingredients
      endorsedBy {
        avatar {
          width
          height
          url
        }
      }
      title
    }
  }
`);

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const { recipe } = await executeQuery(RECIPE_BY_SLUG_QUERY, {
    variables: {
      slug,
    },
  });

  if (!recipe) {
    return <h1 className={title()}>Recipe not found</h1>;
  }

  return (
    <div className="flex-1 flex flex-col gap-4">
      <HeaderImage imageUrl={recipe.image.url} />
      <h1 className={title()}>{recipe.title}</h1>
      <div>
        <Markdown>{recipe.ingredients}</Markdown>
      </div>
    </div>
  );
}
