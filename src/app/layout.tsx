import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'AssurLiaison – Marketplace de portefeuilles d\'assurance',
  description:
    "AssurLiaison met en relation les vendeurs et les acheteurs de portefeuilles d'assurance en toute simplicité. Publiez, recherchez et discutez en toute sécurité."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}