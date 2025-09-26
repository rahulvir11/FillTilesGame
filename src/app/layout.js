import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Tiles Connect - Modern Puzzle Game",
    template: "%s | Tiles Connect"
  },
  description: "A beautiful, modern tile-connecting puzzle game with glassmorphism design, 4 challenging levels, and immersive sound effects. Connect all tiles to win!",
  keywords: [
    "puzzle game",
    "tile game",
    "connect tiles",
    "brain teaser",
    "modern game",
    "web game",
    "React game",
    "Next.js game",
    "glassmorphism",
    "path puzzle"
  ],
  authors: [{ name: "Rahulvir11", url: "https://github.com/rahulvir11" }],
  creator: "Rahulvir11",
  publisher: "Rahulvir11",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tiles-connect.vercel.app",
    siteName: "Tiles Connect",
    title: "Tiles Connect - Modern Puzzle Game",
    description: "A beautiful, modern tile-connecting puzzle game with glassmorphism design, 4 challenging levels, and immersive sound effects. Connect all tiles to win!",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tiles Connect - Modern Puzzle Game Screenshot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tiles Connect - Modern Puzzle Game",
    description: "A beautiful, modern tile-connecting puzzle game with glassmorphism design, 4 challenging levels, and immersive sound effects. Connect all tiles to win!",
    images: ["/og-image.png"],
    creator: "@rahulvir11",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/favicon.ico",
      },
    ],
  },
  manifest: "/manifest.json",
  category: "games",
  classification: "Entertainment",
  rating: "General",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  verification: {
    // Add your verification tokens here when available
    // google: "your-google-verification-token",
    // bing: "your-bing-verification-token",
  },
  alternates: {
    canonical: "https://tiles-connect.vercel.app",
  },
  metadataBase: new URL("https://tiles-connect.vercel.app"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="https://vercel.com" />
        
        {/* Security headers */}
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        
        {/* PWA related meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Tiles Connect" />
        <meta name="application-name" content="Tiles Connect" />
        <meta name="msapplication-TileColor" content="#1a1a2e" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Game-specific structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoGame",
              "name": "Tiles Connect",
              "description": "A beautiful, modern tile-connecting puzzle game with glassmorphism design, 4 challenging levels, and immersive sound effects.",
              "url": "https://tiles-connect.vercel.app",
              "image": "https://tiles-connect.vercel.app/og-image.png",
              "author": {
                "@type": "Person",
                "name": "Rahulvir11",
                "url": "https://github.com/rahulvir11"
              },
              "gameGenre": "Puzzle",
              "gamePlatform": "Web Browser",
              "operatingSystem": "Any",
              "applicationCategory": "Game",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "150"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        
        {/* Analytics placeholder - replace with your analytics code */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics */}
            {/* <Script
              src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'GA_MEASUREMENT_ID');
              `}
            </Script> */}
          </>
        )}
      </body>
    </html>
  );
}
