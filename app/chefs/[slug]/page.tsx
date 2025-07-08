import type { Metadata } from "next";

import { toNextMetadata } from "react-datocms";
import Markdown, { Components } from "react-markdown";

import { ChefRecipeCard } from "./components/chef-recipe-card";
import { HeaderImage } from "./components/header-image";

import { title, subtitle } from "@/components/primitives";
import { executeQuery } from "@/lib/datocms/executeQuery";
import { graphql } from "@/lib/datocms/graphql";

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

const mdxComponents: Components = {
  p: ({ children }) => (
    <p className="text-foreground-700 prose prose-neutral dark:prose-invert max-w-none">
      {children}
    </p>
  ),
};

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
          <h1 className={title({ color: "pink" })}>{character.name}</h1>

          {character.quote && (
            <blockquote className="sm:flex lg:block">
              <svg
                aria-hidden="true"
                className="flex-shrink-0 text-gray-300"
                height="18"
                viewBox="0 0 24 18"
                width="24"
              >
                <path
                  d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                  fill="currentColor"
                />
              </svg>
              <div className="sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-3">
                <p>&ldquo;{character.quote}&rdquo;</p>
              </div>
            </blockquote>
          )}

          {character.bio && (
            <Markdown components={mdxComponents}>{character.bio}</Markdown>
          )}

          {character.powerLevel && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground-600">
                Power Level:
              </span>
              <div className="flex items-center gap-1">
                <div className="w-[100px] h-4 bg-default-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-warning to-danger rounded-full transition-all duration-300"
                    style={{ width: `${(character.powerLevel / 10) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-default">
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
