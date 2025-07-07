"use client";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { usePathname } from "next/navigation";

export const BreadcrumbsComponent = () => {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);

  if (pathParts.length === 0) {
    return null; // No breadcrumbs to display
  }

  return (
    <Breadcrumbs className="mb-4">
      {pathParts.map((part, index) => {
        const href = `/${pathParts.slice(0, index + 1).join("/")}`;
        const partLabel = part
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        if (index === 0 && index === pathParts.length - 1) {
          return null; // Skip the first part if it's "index"
        }

        return (
          <BreadcrumbItem key={index} href={href} title={partLabel}>
            {partLabel}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
};
