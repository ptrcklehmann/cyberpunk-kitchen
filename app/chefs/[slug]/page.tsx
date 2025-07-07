import type { Metadata } from "next";

import { toNextMetadata } from "react-datocms";

import { subtitle, title } from "@/components/primitives";
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
    <div className="flex-1 flex flex-col gap-4">
      <div>
        <p className={subtitle()}>{character.name}</p>
        <p className={subtitle()}>Cooking Method</p>
      </div>
    </div>
  );
}
