import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Tektur as FontHeader,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontHeader = FontHeader({
  subsets: ["latin"],
  variable: "--font-header",
});
