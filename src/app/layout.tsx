import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Image from 'next/image';
import ShoppingCart from './_components/ShoppingCart';
import SearchInput from './_components/SearchInput';
import Link from 'next/link';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Somnio Store',
  description: 'Virtual Store for the Somnio Challenge',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className='bg-softpurple gap-2 px-6 py-2 flex items-center justify-between'>
          <Link href={'/'}>
            <Image
              aria-hidden
              src='/logo.svg'
              alt='Somnio Logo'
              width={173}
              height={63}
            />
          </Link>
          <SearchInput placeholder='Buscar Productos...' />
          <ShoppingCart />
        </nav>
        {children}
      </body>
    </html>
  );
}
