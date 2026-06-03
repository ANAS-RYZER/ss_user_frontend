import type { Metadata, Viewport } from 'next'
import { Lora, Source_Sans_3 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-source-sans',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-lora',
  display: 'swap',
})

const siteName = 'SHARNAYA'
const siteDescription =
  'Traditional South Indian sarees and ethnic wear for women, men, and children. Shop online with easy sizing and secure delivery across India.'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#5c2e2a',
}

export const metadata: Metadata = {
  metadataBase: new URL(
    'https://manjuntha-hall.vercel.app',
  ),
  title: {
    default: `${siteName} — South Indian Traditional Fashion`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    'sarees',
    'South Indian fashion',
    'Kanjeevaram',
    'pattu pavadai',
    'ethnic wear',
    'women',
    'men',
    'children',
  ],
  applicationName: siteName,
  icons: {
    icon: [{ url: '/logo.png', type: 'image/png' }],
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName,
    title: siteName,
    description: siteDescription,
    images: [{ url: '/logo.png', width: 512, height: 512, alt: siteName }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en-IN"
      className={`${sourceSans.variable} ${lora.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-3 focus:text-lg focus:font-semibold focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        <div className="flex min-h-full flex-1 flex-col">{children}</div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
