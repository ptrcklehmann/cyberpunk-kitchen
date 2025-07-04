export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "FlavourForge",
  description: "Where heroes craft legendary meals",
  navItems: [
    {
      label: "Recipes",
      href: "/recipes",
    },
    {
      label: "Recipe Championship",
      href: "/championship",
    },
  ],
  navMenuItems: [
    {
      label: "Recipes",
      href: "/profile",
    },
    {
      label: "Recipe Championship",
      href: "/championship",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    // {
    //   label: "Logout",
    //   href: "/logout",
    // },
  ],
  links: {
    // github: "https://github.com/heroui-inc/heroui",
    // twitter: "https://twitter.com/hero_ui",
    // docs: "https://heroui.com",
    // discord: "https://discord.gg/9b6yyZKmH4",
    // sponsor: "https://patreon.com/jrgarciadev",
  },
};
