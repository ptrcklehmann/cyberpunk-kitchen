import type { Metadata } from "next";

import Markdown from "react-markdown";
import { toNextMetadata } from "react-datocms";

import { HeaderImage } from "./header-image";

import { title, subtitle } from "@/components/primitives";
import { executeQuery } from "@/lib/datocms/executeQuery";
import { graphql } from "@/lib/datocms/graphql";

const RECIPE_BY_SLUG_QUERY = graphql(`
  query RecipeBySlugQuery($slug: String!) {
    recipe(filter: { slug: { eq: $slug } }) {
      _seoMetaTags {
        tag
        attributes
        content
      }
      slug
      image {
        url
        width
        height
      }
      ingredients
      cookingMethod
      chef {
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

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { recipe } = await executeQuery(RECIPE_BY_SLUG_QUERY, {
    variables: {
      slug,
    },
  });

  return toNextMetadata(recipe?._seoMetaTags || []);
}

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
    return (
      <h1
        className={title({
          color: "primary",
        })}
      >
        Recipe not found
      </h1>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-4">
      <HeaderImage imageUrl={recipe.image.url} />
      <h1
        className={title({
          color: "primary",
        })}
      >
        {recipe.title}
      </h1>
      <div>
        <p className={subtitle()}>Ingredients</p>
        <Markdown>{recipe.ingredients}</Markdown>
        <p className={subtitle()}>Cooking Method</p>
        <Markdown>{recipe.cookingMethod}</Markdown>
      </div>
    </div>
  );
}
