import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import PageContainer from "@/components/layout/page-container";
import Header from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DC Campus - Monitoring des salles",
  description: "DC Campus - Monitoring des salles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <PageContainer>
            <Header />
            {children}
          </PageContainer>
        </ThemeProvider>
      </body>
    </html>
  );
}
