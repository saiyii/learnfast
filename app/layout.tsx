import type { Metadata } from "next";
import { Poppins, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "LearnFast - Learn Anything Fast",
  description: "Transform any photo or document into engaging exercises with gamified learning",
  manifest: "/manifest.json",
  themeColor: "#6C5CE7",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleMobileWebAppCapable: "yes",
  appleMobileWebAppStatusBarStyle: "default",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-[#F8F9FA] antialiased">
        {children}
      </body>
    </html>
  );
}
