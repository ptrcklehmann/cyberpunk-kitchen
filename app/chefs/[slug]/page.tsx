import type { Metadata } from "next";

import { toNextMetadata } from "react-datocms";
import Markdown from "react-markdown";

import { ChefRecipeCard } from "./components/chef-recipe-card";
import { HeaderImage } from "./components/header-image";

import { title, subtitle } from "@/components/primitives";
import { executeQuery } from "@/lib/datocms/executeQuery";
import { graphql } from "@/lib/datocms/graphql";
import { mdxComponents } from "@/lib/mdx";

const CHEF_BY_SLUG_QUERY = graphql(`
  query CharacterBySlugQuery($slug: String!) {
    character(filter: { slug: { eq: $slug } }) {
      _seoMetaTags {
        attributes
        content
        tag
      }
      avatar {
        url
        width
        title
        height
      }
      bio
      name
      powerLevel
      quote
      slug
      recipes {
        title
        slug
        image {
          url
          width
          height
        }
      }
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
  const { character } = await executeQuery(CHEF_BY_SLUG_QUERY, {
    variables: {
      slug,
    },
  });

  return toNextMetadata(character?._seoMetaTags || []);
}

export default async function ChefPage({ params }: PageProps) {
  const { slug } = await params;
  const { character } = await executeQuery(CHEF_BY_SLUG_QUERY, {
    variables: {
      slug,
    },
  });

  if (!character) {
    return (
      <h1
        className={title({
          color: "primary",
        })}
      >
        No Chefs found
      </h1>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-8">
      {/* Chef Profile Section */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Avatar */}
        {character.avatar && (
          <HeaderImage imageUrl={character.avatar.url} title={character.name} />
        )}

        {/* Chef Details */}
        <div className="flex-1 space-y-4">
          <h1 className={title({ color: "primary" })}>{character.name}</h1>

          {character.bio ? (
            <Markdown components={mdxComponents}>{character.bio}</Markdown>
          ) : null}

          {character.powerLevel && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground-800">
                Power Level:
              </span>
              <div className="flex items-center gap-1">
                <div className="w-20 h-4 bg-default-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-warning to-danger rounded-full transition-all duration-300"
                    style={{ width: `${(character.powerLevel / 10) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-default-800">
                  {character.powerLevel}/10
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recipes Section */}
      <div>
        {character.recipes.length > 0 ? (
          <h2 className={subtitle()}>Recipes by {character.name}</h2>
        ) : (
          <h2 className={subtitle()}>No recipes found for {character.name}</h2>
        )}
        <div className="flex flex-col">
          {character.recipes.map((recipe) => (
            <ChefRecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
}
