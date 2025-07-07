import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import NextLink from "next/link";

import { SearchInput } from "./search-input";

import { Logo } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";

type NavItem = {
  label: string;
  href: string;
};

const NavLinks = ({ items }: { items: NavItem[] }) => (
  <ul className="hidden lg:flex gap-4 justify-start ml-2">
    {items.map((item) => (
      <NavbarItem key={item.href}>
        <NextLink
          className={clsx(
            linkStyles({ color: "foreground" }),
            "data-[active=true]:text-primary data-[active=true]:font-medium",
          )}
          href={item.href}
        >
          {item.label}
        </NextLink>
      </NavbarItem>
    ))}
  </ul>
);

const MenuItems = ({ items }: { items: NavItem[] }) => (
  <div className="mx-4 mt-2 flex flex-col gap-2">
    {items.map((item, index) => (
      <NavbarMenuItem key={`${item}-${index}`}>
        <Link
          color={
            index === 2
              ? "primary"
              : index === items.length - 1
                ? "danger"
                : "foreground"
          }
          href={item.href}
          size="lg"
        >
          {item.label}
        </Link>
      </NavbarMenuItem>
    ))}
  </div>
);

export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo size={24} />
            <p className="font-bold text-danger-400">FlavourForge</p>
          </NextLink>
        </NavbarBrand>
        <NavLinks items={siteConfig.navItems} />
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden lg:flex">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <SearchInput />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <SearchInput />
        <MenuItems items={siteConfig.navMenuItems} />
      </NavbarMenu>
    </HeroUINavbar>
  );
};
