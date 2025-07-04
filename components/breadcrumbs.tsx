"use client";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { usePathname } from "next/navigation";

export const BreadcrumbsComponent = () => {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumbs className="mb-4">
      {pathParts.map((part, index) => {
        const href = `/${pathParts.slice(0, index + 1).join("/")}`;
        const partLabel = part
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        return (
          <BreadcrumbItem key={index} href={href} title={partLabel}>
            {partLabel}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
};
