import { subtitle, title } from "@/components/primitives";
import { executeQuery } from "@/lib/datocms/executeQuery";
import { graphql } from "@/lib/datocms/graphql";

const CHEF_BY_SLUG_QUERY = graphql(`
  query ChefBySlugQuery($slug: String!) {
    allCharacters(filter: { slug: { eq: $slug } }) {
      slug
      name
      avatar {
        url
        width
        height
      }
    }
  }
`);

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function ChefPage({ params }: PageProps) {
  const slug = (await params).slug;
  const { allCharacters } = await executeQuery(CHEF_BY_SLUG_QUERY, {
    variables: {
      slug,
    },
  });

  if (!allCharacters.length) {
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
        <p className={subtitle()}>Ingredients</p>{" "}
        <p className={subtitle()}>Cooking Method</p>{" "}
      </div>
    </div>
  );
}
