import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from './StoreProvider';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ToastContainer } from 'react-toastify';
import { LoadingOverlay } from '@lfvn-customer/shared';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LFVN Customer App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <StoreProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
          <ToastContainer />
          <LoadingOverlay />
        </StoreProvider>
      </body>
    </html>
  );
}
