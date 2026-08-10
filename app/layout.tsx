import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Arz. — Pakistani Climate Awareness",
  description: "Real verified climate statistics and community action for Pakistan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} ${inter.variable} antialiased scroll-smooth`}
    >
      <body className="min-h-screen bg-[#0a1210] text-[#f2f0e8] font-sans selection:bg-[#ff6a2b] selection:text-[#0c1614] overflow-x-hidden relative">
        {children}
      </body>
    </html>
  );
}

