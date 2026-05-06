import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/smooth-scroll-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/layout/footer";
import { CarScrollbar } from "@/components/ui/car-scrollbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vroom-rentals.vercel.app"),
  title: {
    default: "Vroom | Premium Vehicle Rental & Luxury Fleet",
    template: "%s | Vroom"
  },
  description: "Experience the ultimate in luxury and performance with Vroom. Our premium fleet and seamless booking system make your next journey unforgettable.",
  keywords: ["luxury car rental", "premium vehicles", "car hire dhaka", "vroom rentals", "sports car rental"],
  authors: [{ name: "Vroom Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vroom-rentals.vercel.app",
    siteName: "Vroom",
    title: "Vroom | Premium Vehicle Rental & Luxury Fleet",
    description: "Rent the world's most premium vehicles with ease. High-performance sports cars, luxury sedans, and spacious SUVs.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vroom Premium Fleet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vroom | Premium Vehicle Rental",
    description: "Experience luxury on the road with Vroom's premium fleet.",
    images: ["/og-image.jpg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased selection:bg-primary/30 selection:text-primary-foreground font-sans bg-background text-foreground transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CarScrollbar />
          <AuthProvider>
            <SmoothScrollProvider>
              <div className="flex flex-col min-h-screen">
                <div className="flex-grow">
                  {children}
                </div>
                <Footer />
              </div>
            </SmoothScrollProvider>
          </AuthProvider>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
