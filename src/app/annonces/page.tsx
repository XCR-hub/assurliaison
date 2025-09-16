import { prisma } from '@/src/lib/db';
import Link from 'next/link';

/**
 * Liste les annonces approuvées et affiche des informations de base. Les visiteurs
 * non abonnés ne verront que des informations limitées (anonymisées) mais ce
 * composant ne gère pas encore cette logique de paywall. Cela sera
 * implémenté ultérieurement via l'authentification et les rôles.
 */
export default async function ListingPage() {
  const listings = await prisma.listing.findMany({
    where: { status: 'APPROVED' },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">Annonces disponibles</h1>
      {listings.length === 0 && <p>Aucune annonce pour le moment.</p>}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <li key={listing.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
            <h2 className="text-xl font-semibold truncate">
              {listing.anonymized ? 'Annonce confidentielle' : listing.title}
            </h2>
            <p className="mt-2 text-sm text-gray-600 truncate">
              {listing.shortDesc ?? 'Description non fournie'}
            </p>
            <Link href={`/annonces/${listing.slug}`} className="mt-4 inline-block text-blue-600 hover:underline">
              Voir les détails
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}