import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Sophia Mai — a little collection', description: 'Doodles, photographs, and things collected along the way.' };
export default function Layout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
