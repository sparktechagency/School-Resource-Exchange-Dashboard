import localFont from 'next/font/local';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import Providers from '../lib/Providers';
import ReduxProviders from '@/redux/lib/ReduxProvider';
import { AntdRegistry } from '@ant-design/nextjs-registry';

const generalSans = localFont({
  src: '../assets/fonts/GeneralSans-Variable.woff2',
  variable: '--font-general-sans',
  weight: '100 900',
  display: 'swap',
  subsets: ['latin'],
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  display: 'swap',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
});

export const metadata = {
  title: {
    default: 'School Resource Exchange app Dashbaord',
    template: '%s | School Resource Exchange app Dashbaord',
  },
  description: 'School Resource Exchange app Dashbaord',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-32x32.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className={`${generalSans.className} ${dmSans.variable} box-border antialiased`}>
        <AntdRegistry>
          <ReduxProviders>
            <Providers>{children}</Providers>
          </ReduxProviders>
        </AntdRegistry>
      </body>
    </html>
  );
}
