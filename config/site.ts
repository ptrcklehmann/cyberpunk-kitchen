export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Cyberpunk Kitchen",
  description: "A futuristic dining experience",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Recipes",
      href: "/recipes",
    },
    {
      label: "Tips & Tricks",
      href: "/tips-tricks",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    // github: "https://github.com/heroui-inc/heroui",
    // twitter: "https://twitter.com/hero_ui",
    // docs: "https://heroui.com",
    // discord: "https://discord.gg/9b6yyZKmH4",
    // sponsor: "https://patreon.com/jrgarciadev",
  },
};
