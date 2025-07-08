import { Link } from "@heroui/link";
import { Components } from "react-markdown";

export const mdxComponents: Components = {
  p: ({ children }) => (
    <p className="text-foreground prose prose-neutral dark:prose-invert max-w-none">
      {children}
    </p>
  ),
  h1: ({ children }) => (
    <h1 className="text-2xl font-bold text-foreground">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-semibold text-foreground">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-medium text-foreground">{children}</h3>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-5 text-foreground">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-5 text-foreground">{children}</ol>
  ),
  li: ({ children }) => <li className="text-foreground">{children}</li>,
  a: ({ children, href }) => (
    <Link
      className="hover:underline"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </Link>
  ),
};
