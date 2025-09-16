import { prisma } from '@/src/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface Props {
  params: { slug: string };
}

/**
 * Page détail d'une annonce. Affiche toutes les informations pour les
 * utilisateurs abonnés. Pour les invités, certaines informations peuvent
 * être masquées (non implémenté ici).
 */
export default async function ListingDetailPage({ params }: Props) {
  const listing = await prisma.listing.findUnique({
    where: { slug: params.slug },
    include: { seller: true }
  });
  if (!listing) {
    notFound();
  }
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-4">
      <Link href="/annonces" className="text-sm text-blue-600 hover:underline">
        ← Retour aux annonces
      </Link>
      <h1 className="text-3xl font-bold">
        {listing.anonymized ? 'Annonce confidentielle' : listing.title}
      </h1>
      <div className="text-sm text-gray-500">Publié le {listing.createdAt.toLocaleDateString('fr-FR')}</div>
      <p className="mt-4 text-gray-700 whitespace-pre-line">{listing.longDesc ?? listing.shortDesc}</p>
      <div className="mt-6">
        {/* D'autres informations détaillées peuvent être ajoutées ici */}
      </div>
    </div>
  );
}