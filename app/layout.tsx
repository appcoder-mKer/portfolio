import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { site } from "@/content/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.role}`, template: `%s — ${site.name}` },
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0c0e" },
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <Providers>
          <SmoothScroll>
            <Nav />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
