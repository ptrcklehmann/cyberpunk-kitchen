import type { TadaDocumentNode } from "gql.tada";
import type { ComponentType } from "react";
import type { BuildQueryVariablesFn } from "../generateMetadataFn";
import type { RealtimeComponentType } from "./generateRealtimeComponent";

import { draftMode } from "next/headers";

import { executeQuery } from "../executeQuery";

/**
 * Generates a Next.js page component that executes a DatoCMS query, and then
 * refers to either the `contentComponent` or `realtimeComponent` for the actual
 * rendering.
 *
 * When Draft Mode is ON:
 * - DatoCMS returns the draft content;
 * - the page displays `realtimeComponent`.
 *
 * When Draft Mode is OFF:
 * - DatoCMS returns the published content;
 * - the page displays `contentComponent`.
 */
export function generatePageComponent<PageProps, Result, Variables>(
  options: GeneratePageComponentOptions<PageProps, Result, Variables>,
) {
  return async function Page(unsanitizedPageProps: PageProps) {
    const { isEnabled: isDraftModeEnabled } = await draftMode();

    /*
     * Since props passed from the server to client components must be
     * serializable, we extract the non-serializable `searchParams` property
     * from the original object.
     */
    const { ...pagePropsWithoutSearchParams } =
      unsanitizedPageProps as PageProps & {
        searchParams: unknown;
      };

    const pageProps = pagePropsWithoutSearchParams as unknown as PageProps;

    const variables =
      (await options.buildQueryVariables?.(pageProps)) || ({} as Variables);

    const data = await executeQuery(options.query, {
      variables,
      includeDrafts: isDraftModeEnabled,
    });

    const {
      realtimeComponent: RealTimeComponent,
      contentComponent: ContentComponent,
    } = options;

    return isDraftModeEnabled ? (
      <RealTimeComponent
        excludeInvalid={true}
        includeDrafts={isDraftModeEnabled}
        initialData={data}
        pageProps={pageProps}
        query={options.query}
        token={process.env.DATOCMS_DRAFT_CONTENT_CDA_TOKEN!}
        variables={variables}
      />
    ) : (
      <ContentComponent {...pageProps} data={data} />
    );
  };
}

export type ContentComponentType<PageProps, Result> = ComponentType<
  PageProps & {
    data: Result;
  }
>;

export type GeneratePageComponentOptions<PageProps, Result, Variables> = {
  /** The GraphQL query to fetch data for the page. */
  query: TadaDocumentNode<Result, Variables>;

  /** A function that takes page props and builds and returns the variables
   * required by the GraphQL query. */
  buildQueryVariables?: BuildQueryVariablesFn<PageProps, Variables>;

  /** A React component that will be rendered if Draft Mode is OFF. */
  contentComponent: ContentComponentType<PageProps, Result>;

  /** A React component that will be rendered if Draft Mode is ON. */
  realtimeComponent: RealtimeComponentType<PageProps, Result, Variables>;
};
